export type ProjectStatus = 'not-started' | 'in-progress' | 'completed';

export interface ProjectStage {
  id: string;
  name: string;
  status: ProjectStatus;
  deadline: string;
  responsible: string;
  description?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  stages: ProjectStage[];
  members: number;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateProjectStage = Omit<ProjectStage, 'id'>;
export type CreateProject = {
  name: string;
  description: string;
  stages: (CreateProjectStage & { id: string })[];
  members: number;
  color: string;
};