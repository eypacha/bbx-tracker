# BBX Tracker!
Simple Beatbox Tracker hecho en JavasScript y con varios plugins.

[DEMO](https://eypacha.github.io/bbx-tracker/)

## Descripción
1. Los beats se componen mediante un recuadro de texto utilizando una codifición para los sonidos.
2. Los sonidos se reproducen mediante la librería de audio [Howler.js](https://howlerjs.com)
3. Un [EyPacha!](http://eypacha.com) pixelar mueve la boca para darle visual.
4. Se puede compartir el beat por medio de una variable en la URL.
5. La misma se encuentra codificada en UTF64 mediante [LZString](https://github.com/pieroxy/lz-string/)
6. La url generada se acorta mediante el servicio de [Bitly API](http://dev.bitly.com/)
7. Y se generan los botones para compartir en las redes.
8. Ahhh.... [JQuery](https://code.jquery.com) para facilitar el proceso.
9. Y una pizca de [FontAwesome](http://fontawesome.io/) para darle sabor.


## Lista de sonidos
- `--` Silencio
- `B-` Bombo
- `BB` Bombo largo
- `ts` Hi-hat
- `Pf` Redoblante
- `^K` Redoblante aspirado
- `^m` Scratch de labios
- `c1`,`c2`,`c3` Clicks de lenga
- `ió` Sílaba "Yo"
- `soy` Sílaba "Soy"
- `Pa` Sílaba "Pa"
- `Cha` Sílaba "Cha"
- `vi` Sílaba "Vi"
- `buen` Sílaba "buen"
- `pfar` Redoblante + Sílaba "ar"
- `ke` Sílaba "que"
- `ca` Sílaba "ca"
- `bu` Sílaba "bu"
- `co` Sílaba "co"