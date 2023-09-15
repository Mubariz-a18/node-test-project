CREATE DATABASE node_test
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_India.1252'
    LC_CTYPE = 'English_India.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE IF NOT EXISTS public."Users"
(
    user_id uuid NOT NULL,
    user_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    user_email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    user_password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    user_image character varying(255) COLLATE pg_catalog."default",
    total_orders integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    last_logged_in timestamp with time zone,
    CONSTRAINT "Users_pkey" PRIMARY KEY (user_id),
    CONSTRAINT "Users_user_email_key" UNIQUE (user_email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Users"
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public."SequelizeMeta"
(
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."SequelizeMeta"
    OWNER to postgres;