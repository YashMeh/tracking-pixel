create table click_through(
    id serial primary key,
    campaign varchar(50),
    item integer,
    open integer
);

create table click_time(
    id serial,
    click_id integer REFERENCES click_through (id),
    open_time timestamptz
);