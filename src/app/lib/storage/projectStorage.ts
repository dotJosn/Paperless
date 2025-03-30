import { Project } from '@/app/lib/types/project';
import projectsData from './projects.json';

class ProjectStorage {
  async getProjects(): Promise<Project[]> {
    return projectsData as Project[];
  }

  async getProjectById(id: string): Promise<Project | undefined> {
    return projectsData.find(project => project.id === id) as Project | undefined;
  }
}

export const projectStorage = new ProjectStorage();