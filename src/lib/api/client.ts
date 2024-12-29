import { supabase } from './config';
import { ApiError } from './utils/errors';
import type { ApiResponse } from './types';

export class ApiClient {
  async get<T>(table: string, query?: object): Promise<ApiResponse<T>> {
    let builder = supabase.from(table).select();
    
    if (query) {
      builder = builder.match(query);
    }

    const { data, error } = await builder;

    if (error) {
      throw new ApiError(
        'query_error',
        error.message,
        { details: error.details }
      );
    }

    return {
      data,
      status: 200
    };
  }

  async post<T>(table: string, data: unknown): Promise<ApiResponse<T>> {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single();

    if (error) {
      throw new ApiError(
        'insert_error',
        error.message,
        { details: error.details }
      );
    }

    return {
      data: result,
      status: 201
    };
  }

  async update<T>(table: string, id: string, data: unknown): Promise<ApiResponse<T>> {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new ApiError(
        'update_error',
        error.message,
        { details: error.details }
      );
    }

    return {
      data: result,
      status: 200
    };
  }
}

export const apiClient = new ApiClient();