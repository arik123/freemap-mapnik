import { Rule, Style } from "jsxnik/mapnikConfig";
import { colors } from "./colors";
import { TextSymbolizerEx } from "./TextSymbolizerEx";
import { Placements } from "./Placements";
import { SqlLayer } from "./SqlLayer";

export function ProtectedAreaNames() {
  return (
    <>
      <Style name="protected_area_names">
        <Rule>
          <TextSymbolizerEx
            nature
            wrap
            fill={colors.protected}
            haloFill="white"
            haloRadius={1.5}
            placement="interior"
            placementType="list"
          >
            [name]
            <Placements />
          </TextSymbolizerEx>
        </Rule>
      </Style>

      <SqlLayer
        styleName="protected_area_names"
        bufferSize={1024}
        minZoom={12}
        sql="
          SELECT type, name, protect_class, geometry
          FROM osm_protected_areas
          WHERE geometry && !bbox! AND (type = 'nature_reserve' OR (type = 'protected_area' AND protect_class <> '2'))
          ORDER BY area DESC
        "
      />
    </>
  );
}
