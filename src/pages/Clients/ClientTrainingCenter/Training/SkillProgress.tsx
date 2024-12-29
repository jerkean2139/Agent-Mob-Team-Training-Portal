import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
}

interface SkillProgressProps {
  skills: Skill[];
}

export default function SkillProgress({ skills }: SkillProgressProps) {
  return (
    <div className="space-y-4">
      {skills.map((skill) => (
        <div key={skill.id} className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">{skill.name}</h4>
            <span className="text-sm text-gray-500">
              Level {skill.level}/{skill.maxLevel}
            </span>
          </div>
          <div className="flex gap-2">
            {[...Array(skill.maxLevel)].map((_, index) => (
              <div key={index} className="flex-1">
                {index < skill.level ? (
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}