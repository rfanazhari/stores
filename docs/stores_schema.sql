--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.3 (Ubuntu 16.3-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: stores; Type: SCHEMA; Schema: -; Owner: fan
--

CREATE SCHEMA stores;


ALTER SCHEMA stores OWNER TO fan;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: auth; Type: TABLE; Schema: stores; Owner: fan
--

CREATE TABLE stores.auth (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    roles character varying NOT NULL,
    "isActive" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE stores.auth OWNER TO fan;

--
-- Name: gifts; Type: TABLE; Schema: stores; Owner: fan
--

CREATE TABLE stores.gifts (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    image character varying NOT NULL,
    rating numeric DEFAULT '0'::numeric,
    stock integer DEFAULT 0,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE stores.gifts OWNER TO fan;

--
-- Name: redeems; Type: TABLE; Schema: stores; Owner: fan
--

CREATE TABLE stores.redeems (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id character varying NOT NULL,
    gift_id character varying NOT NULL,
    qty integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE stores.redeems OWNER TO fan;

--
-- Name: users; Type: TABLE; Schema: stores; Owner: fan
--

CREATE TABLE stores.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    role character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE stores.users OWNER TO fan;

--
-- Data for Name: auth; Type: TABLE DATA; Schema: stores; Owner: fan
--

COPY stores.auth (id, user_id, email, password, roles, "isActive", "createdAt") FROM stdin;
fe2539e9-f2a2-4d6b-8fd8-eb63a4e312d9	221e6081-39bc-419d-bd06-f7e152eadfc7	admin@example.ext	$2b$10$PHGnI.D/bpRUcxEWHxynHOXkeylCjQI8Ffrtjnj5BvV4sKu8aZkNe	ADMIN	t	2024-06-27 16:08:02.525787
4b5766f6-40cf-4dff-ac95-4625614f855b	007d6fdf-5130-4e4b-a962-226aa8ad01e1	user@example.ext	$2b$10$baQvtm/RXuPK69.HWqvUWuyFfO0B7SG3Hy5FhQER/STKV/XZLWBjG	USER	t	2024-06-27 16:24:08.373804
\.


--
-- Data for Name: gifts; Type: TABLE DATA; Schema: stores; Owner: fan
--

COPY stores.gifts (id, name, description, image, rating, stock, "isDeleted", "createdAt") FROM stdin;
49475a5b-9c48-4517-9b86-2e230f880741	gift 1	gift 1 desc	https://unsplash.com/photos/brown-gift-box-with-pink-ribbon-f94JPVrDbnY	0	0	f	2024-06-27 16:54:05.034927
f6e28452-6dee-4140-8895-d937edde96cc	gift 2	gift 1 desc	https://unsplash.com/photos/brown-gift-box-with-pink-ribbon-f94JPVrDbnY	0	0	f	2024-06-27 16:54:09.594481
df1508a5-b34b-4146-beb4-0bcd0df28294	gift 3	gift 1 desc	https://unsplash.com/photos/brown-gift-box-with-pink-ribbon-f94JPVrDbnY	0	0	f	2024-06-27 16:54:13.928983
f1f958f6-74a5-48e9-9f51-8fe8dcbf6290	gift 4	gift 1 desc	https://unsplash.com/photos/brown-gift-box-with-pink-ribbon-f94JPVrDbnY	0	0	f	2024-06-27 16:54:18.378765
7f16fb51-bd62-4fed-b982-ba3522444780	gift 5	gift 1 desc	https://unsplash.com/photos/brown-gift-box-with-pink-ribbon-f94JPVrDbnY	0	0	f	2024-06-27 16:54:22.949212
\.


--
-- Data for Name: redeems; Type: TABLE DATA; Schema: stores; Owner: fan
--

COPY stores.redeems (id, user_id, gift_id, qty, "createdAt") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: stores; Owner: fan
--

COPY stores.users (id, name, email, role, "createdAt") FROM stdin;
221e6081-39bc-419d-bd06-f7e152eadfc7	admin	admin@example.ext	ADMIN	2024-06-27 16:08:02.514807
007d6fdf-5130-4e4b-a962-226aa8ad01e1	user	user@example.ext	USER	2024-06-27 16:24:08.358939
\.


--
-- Name: redeems PK_526a90deaf0ab4c46d85119c38a; Type: CONSTRAINT; Schema: stores; Owner: fan
--

ALTER TABLE ONLY stores.redeems
    ADD CONSTRAINT "PK_526a90deaf0ab4c46d85119c38a" PRIMARY KEY (id);


--
-- Name: gifts PK_54242922934e1f322861d116af7; Type: CONSTRAINT; Schema: stores; Owner: fan
--

ALTER TABLE ONLY stores.gifts
    ADD CONSTRAINT "PK_54242922934e1f322861d116af7" PRIMARY KEY (id);


--
-- Name: auth PK_7e416cf6172bc5aec04244f6459; Type: CONSTRAINT; Schema: stores; Owner: fan
--

ALTER TABLE ONLY stores.auth
    ADD CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: stores; Owner: fan
--

ALTER TABLE ONLY stores.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: users email_type; Type: CONSTRAINT; Schema: stores; Owner: fan
--

ALTER TABLE ONLY stores.users
    ADD CONSTRAINT email_type UNIQUE (email);


--
-- PostgreSQL database dump complete
--

