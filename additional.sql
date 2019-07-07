CREATE EXTENSION intarray;

-- see https://wiki.postgresql.org/wiki/First/last_(aggregate)

-- Create a function that always returns the first non-NULL item
CREATE OR REPLACE FUNCTION public.first_agg ( anyelement, anyelement )
RETURNS anyelement LANGUAGE SQL IMMUTABLE STRICT AS $$
        SELECT $1;
$$;

-- And then wrap an aggregate around it
CREATE AGGREGATE public.FIRST (
        sfunc    = public.first_agg,
        basetype = anyelement,
        stype    = anyelement
);

-- Create a function that always returns the last non-NULL item
CREATE OR REPLACE FUNCTION public.last_agg ( anyelement, anyelement )
RETURNS anyelement LANGUAGE SQL IMMUTABLE STRICT AS $$
        SELECT $2;
$$;

-- And then wrap an aggregate around it
CREATE AGGREGATE public.LAST (
        sfunc    = public.last_agg,
        basetype = anyelement,
        stype    = anyelement
);

-- not sure if those indexes help ;-)
create index idx_colour on osm_routes (colour);
create index idx_symbol on osm_routes ("osmc:symbol");
create index idx_network on osm_routes (network);
create index idx_type on osm_routes (type);

drop table if exists zindex;
create table zindex (type varchar primary key, z serial);
insert into zindex (type) values
('guidepost'),
('archaeological_site'),
('water_park'),
('tower_observation'),
('cave_entrance'),
('monument'),
('office'),
('hotel'),
('chalet'),
('hostel'),
('motel'),
('guest_house'),
('alpine_hut'),
('wilderness_hut'),
('camp_site'),
('castle'),
('hut'),
('cabin'),
('station'),
('halt'),
('bus_station'),
('church'),
('chapel'),
('cathedral'),
('temple'),
('basilica'),
('shelter'),
('museum'),
('cinema'),
('theatre'),
('bunker'),
('restaurant'),
('pub'),
('convenience'),
('supermarket'),
('fuel'),
('fast_food'),
('cafe'),
('confectionery'),
('hospital'),
('pharmacy'),
('waterfall'),
('spring'),
('drinking_water'),
('water_point'),
('viewpoint'),
('mine'),
('adit'),
('mineshaft'),
('townhall'),
('memorial'),
('hunting_stand'),
('bus_stop'),
('board'),
('map'),
('artwork'),
('fountain'),
('community_centre'),
('fire_station'),
('police'),
('post_office'),
('playground'),
('wayside_shrine'),
('wayside_cross'),
('cross'),
('rock'),
('stone'),
('toilets'),
('post_box'),
('telephone'),
('chimney'),
('water_tower'),
('attraction'),
('tower_communication'),
('mast_communication'),
('tower_other'),
('mast_other'),
('saddle'),
('peak1'),
('peak2'),
('peak3'),
('peak'),
('firepit'),
('bench'),
('waste_basket'),
('waste_disposal'),
('lift_gate'),
('watering_place'),
('feeding_place'),
('game_feeding'),
('gate'),
('ruins');
