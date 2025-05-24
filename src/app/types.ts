export interface Project {
    id: string;
    name: string;
    material: string;
    programmer: string;
    createdAt: string;
    preview: string;
    summary: {
      totalOperations: number;
      totalTime: string;
    };
    details: {
      header: {
        printedDate: string;
        programFolder: string;
        projectFolder: string;
      };
      operations: Operation[];
    };
  }
  
  export interface Operation {
    id: string;
    preview: string;
    tipoPercurso: string;
    referencia: string;
    comentario: string;
    diametro: string;
    rc: string;
    rib: string;
    altura: string;
    zMin: string;
    sobreEspessura: {
      lat2D: string;
      lat: string;
      vert: string;
    };
    passo: {
      lat: string;
      vert: string;
    };
    tolerancia: string;
    rotacao: string;
    avanço: string;
    plano: string;
    planoTrabalho: string;
    tempo: {
      corte: string;
      total: string;
    };
    ferramenta: string;
    suporte: string;
  }