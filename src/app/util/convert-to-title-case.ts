  export function convertToTitleCase(texto: string): string {

    if (texto.length < 1) return texto;

    const novaString = texto[0].toUpperCase() + texto.substring(1).toLowerCase();

    return novaString;
  }

  //parecido com classes globais estaticas do C#