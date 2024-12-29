import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { google } from 'https://deno.land/x/google_auth@v0.3.0/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Validate request
    if (!req.body) {
      throw new Error('Request body is required')
    }

    const { action, file } = await req.json()
    
    if (!action || !file) {
      throw new Error('Invalid request format')
    }

    // Get and validate service account credentials
    const privateKey = Deno.env.get('GOOGLE_PRIVATE_KEY')?.replace(/\\n/g, '\n')
    const projectId = Deno.env.get('GOOGLE_PROJECT_ID')
    const clientEmail = Deno.env.get('GOOGLE_CLIENT_EMAIL')
    const folderId = Deno.env.get('GOOGLE_DRIVE_FOLDER_ID')

    if (!privateKey || !projectId || !clientEmail || !folderId) {
      throw new Error('Missing required environment variables')
    }

    // Initialize Google Drive client
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: 'service_account',
        project_id: projectId,
        private_key: privateKey,
        client_email: clientEmail,
        token_uri: 'https://oauth2.googleapis.com/token'
      },
      scopes: ['https://www.googleapis.com/auth/drive.file']
    })
    
    const drive = google.drive({ version: 'v3', auth })

    switch (action) {
      case 'upload': {
        // Validate file data
        if (!file.name || !file.type || !file.content) {
          throw new Error('Invalid file data')
        }

        const fileMetadata = {
          name: file.name,
          parents: [folderId]
        }

        // Convert base64 to buffer
        const content = file.content.split(',')[1]
        const buffer = Uint8Array.from(atob(content), c => c.charCodeAt(0))

        const media = {
          mimeType: file.type,
          body: buffer
        }

        const response = await drive.files.create({
          requestBody: fileMetadata,
          media: media,
          fields: 'id,webViewLink'
        })

        return new Response(
          JSON.stringify({ 
            fileId: response.data.id,
            webViewLink: response.data.webViewLink 
          }),
          { 
            headers: { 
              ...corsHeaders, 
              'Content-Type': 'application/json' 
            } 
          }
        )
      }

      default:
        throw new Error(`Unsupported action: ${action}`)
    }
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }
      }
    )
  }
})