# BBX Sekuencer!
Simple Beatbox Sekuencer hecho en JavasScript y con varios plugins.

[DEMO](https://eypacha.github.io/bbx-sekuenser/)

## Descripción
1. Los beats se componen mediante un recuadro de texto utilizando una [codificación  para los sonidos](#lista-de-sonidos).
2. Los sonidos se reproducen mediante la librería de audio [Howler.js](https://howlerjs.com)
3. Un [EyPacha!](http://eypacha.com) pixelar mueve la boca tratando de imitar la fonética y los ojos a modo de metrónomo.
4. Se puede compartir el beat por medio de una variable en la URL.
5. La misma se encuentra codificada en UTF64 mediante [LZString](https://github.com/pieroxy/lz-string/)
6. La url generada se acorta mediante el servicio de [Bitly API](http://dev.bitly.com/)
7. Y se generan los botones para compartir en las redes.
8. Ahhh.... [JQuery](https://code.jquery.com) para facilitar el proceso.
9. Y una pizca de [FontAwesome](http://fontawesome.io/) para darle sabor.


## Lista de sonidos
- `-`,`--` Silencio
- `B` Bombo
- `BB` Bombo largo
- `t`,`ts` Hi-hat
- `Pf` Redoblante
- `^K`,`K` Redoblante aspirado
- `^m`,`m`,`mm` Scratch de labios
- `c`,`c1`,`c2`,`c3` Clicks de lenga
- `ió`,`yo` Sílaba "Yo"
- `soy` Sílaba "Soy"
- `Pa` Sílaba "Pa"
- `Cha!` Sílaba "Cha"
- `vi`,`bi`,`pi` Sílaba "bi"
- `buen` Sílaba "buen"
- `pfar` Redoblante + Sílaba "ar"
- `ke`,`que` Sílaba "que"
- `ca`,`ka` Sílaba "ca"
- `bu`,`pu` Sílaba "bu"
- `co`,`ko` Sílaba "co"
