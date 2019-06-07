const { font } = require('./fontFactory');

const extensions = {
  style: {
    typesRule(style, ...t) {
      const q = [...t];
      let minZoom, maxZoom;
      if (typeof q[0] === 'number' || typeof q[0] === 'undefined') {
        minZoom = q.shift();
      }
      if (typeof q[0] === 'number' || typeof q[0] === 'undefined') {
        maxZoom = q.shift();
      }
      return style.rule({ filter: types(...q), minZoom, maxZoom });
    },
    poiIcons(style, pois) {
      for (const [minIcoZoom, , , , type, extra = {}] of pois) {
        if (typeof minIcoZoom !== 'number') {
          continue;
        }
        const types = Array.isArray(type) ? type : [type];
        const zoom = [minIcoZoom];
        if (extra.maxZoom) {
          zoom.push(extra.maxZoom);
        }
        style.typesRule(...zoom, ...types)
          .markersSymbolizer({ file: `images/${extra.icon || types[0]}.svg` });
      }
      return style; // TODO remove
    },
    poiNames(style, pois) {
      for (const [, minTextZoom, withEle, natural, type, extra = {}] of pois) {
        if (typeof minTextZoom !== 'number') {
          continue;
        }
        const types = Array.isArray(type) ? type : [type];

        const fnt = font().wrap().if(natural, f => f.nature()).end({ dy: -10, ...(extra.font || {}) });
        const { textSymbolizerEle } = style
          .typesRule(minTextZoom, ...types)
          .textSymbolizer(fnt,
            withEle ? undefined : '[name]');
        if (withEle) {
          textSymbolizerEle.text('[name] + "\n"');
          textSymbolizerEle.ele('Format', { size: fnt.size * 0.8 }, '[ele]');
        }
      }
      return style; // TODO remove
    },
    area(style, color, ...types) {
      return style.typesRule(...types)
        .borderedPolygonSymbolizer(color);
    }
  },
  rule: {
    borderedPolygonSymbolizer(rule, color) {
      return rule
        .polygonSymbolizer({ fill: color })
        .lineSymbolizer({ stroke: color, strokeWidth: 1 });
    },
  }
};

function types(...type) {
  return type.map((x) => `[type] = '${x}'`).join(' or ');
}

module.exports = { extensions, types };