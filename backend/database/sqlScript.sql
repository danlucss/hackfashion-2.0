DROP TABLE product_colors ;
DROP TABLE product_sizes ;
DROP TABLE rating_star ;
DROP TABLE product_types ;
DROP TABLE colors ;
DROP TABLE types ;
DROP TABLE order_details ;
DROP TABLE pedidos ;
DROP TABLE address ;
DROP TABLE customer ;
DROP TABLE products ;


CREATE SEQUENCE public.colors_color_id_seq_1;

CREATE TABLE public.colors (
                color_id INTEGER NOT NULL DEFAULT nextval('public.colors_color_id_seq_1'),
                color VARCHAR NOT NULL,
                CONSTRAINT colors_pk PRIMARY KEY (color_id)
);


ALTER SEQUENCE public.colors_color_id_seq_1 OWNED BY public.colors.color_id;

CREATE SEQUENCE public.types_type_id_seq;

CREATE TABLE public.types (
                type_id INTEGER NOT NULL DEFAULT nextval('public.types_type_id_seq'),
                type VARCHAR NOT NULL,
                CONSTRAINT types_pk PRIMARY KEY (type_id)
);


ALTER SEQUENCE public.types_type_id_seq OWNED BY public.types.type_id;

CREATE SEQUENCE public.customer_customer_id_seq;

CREATE TABLE public.customer (
                customer_id INTEGER NOT NULL DEFAULT nextval('public.customer_customer_id_seq'),
                name VARCHAR(60) NOT NULL,
                email VARCHAR(60) NOT NULL,
                password VARCHAR NOT NULL,
                phone VARCHAR(13),
                CONSTRAINT customer_pk PRIMARY KEY (customer_id)
);
ALTER TABLE customer ADD CONSTRAINT unique_email UNIQUE (email);


ALTER SEQUENCE public.customer_customer_id_seq OWNED BY public.customer.customer_id;

CREATE SEQUENCE public.address_id_address_seq_1;

CREATE TABLE public.address (
                id_address INTEGER NOT NULL DEFAULT nextval('public.address_id_address_seq_1'),
                customer_id INTEGER NOT NULL,
                address VARCHAR(100) NOT NULL,
                uf VARCHAR(2) NOT NULL,
                city VARCHAR(30) NOT NULL,
                cep VARCHAR(9) NOT NULL,
                CONSTRAINT address_pk PRIMARY KEY (id_address)
);


ALTER SEQUENCE public.address_id_address_seq_1 OWNED BY public.address.id_address;

CREATE TABLE public.pedidos (
                pedido_id INTEGER NOT NULL,
                customer_id INTEGER NOT NULL,
                id_address INTEGER NOT NULL,
                total_price REAL NOT NULL,
                date TIMESTAMP NOT NULL,
                status VARCHAR NOT NULL,
                CONSTRAINT pedidos_pk PRIMARY KEY (pedido_id)
);


CREATE SEQUENCE public.products_product_id_seq;

CREATE TABLE public.products (
                product_id INTEGER NOT NULL DEFAULT nextval('public.products_product_id_seq'),
                name VARCHAR(30) NOT NULL,
                img_link VARCHAR NOT NULL,
                price REAL NOT NULL,
                trademark VARCHAR NOT NULL,
                offer_percent REAL DEFAULT 0,
                in_stock BOOLEAN NOT NULL,
                CONSTRAINT products_pk PRIMARY KEY (product_id)
);


ALTER SEQUENCE public.products_product_id_seq OWNED BY public.products.product_id;

CREATE SEQUENCE public.product_colors_product_color_id_seq;

CREATE TABLE public.product_colors (
                product_color_id INTEGER NOT NULL DEFAULT nextval('public.product_colors_product_color_id_seq'),
                product_id INTEGER NOT NULL,
                color_id INTEGER NOT NULL,
                CONSTRAINT product_colors_pk PRIMARY KEY (product_color_id)
);


ALTER SEQUENCE public.product_colors_product_color_id_seq OWNED BY public.product_colors.product_color_id;

CREATE TABLE public.product_sizes (
                product_id INTEGER NOT NULL,
                p INTEGER NOT NULL,
                m INTEGER DEFAULT 0 NOT NULL,
                g INTEGER NOT NULL,
                gg INTEGER NOT NULL,
                CONSTRAINT product_sizes_pk PRIMARY KEY (product_id)
);


CREATE TABLE public.rating_star (
                product_id INTEGER NOT NULL,
                one_star INTEGER DEFAULT 0 NOT NULL,
                two_star INTEGER DEFAULT 0 NOT NULL,
                three_star INTEGER DEFAULT 0 NOT NULL,
                four_star INTEGER DEFAULT 0 NOT NULL,
                five_star INTEGER DEFAULT 1 NOT NULL,
                CONSTRAINT rating_star_pk PRIMARY KEY (product_id)
);


CREATE SEQUENCE public.product_types_product_type_id_seq;

CREATE TABLE public.product_types (
                product_type_id INTEGER NOT NULL DEFAULT nextval('public.product_types_product_type_id_seq'),
                product_id INTEGER NOT NULL,
                type_id INTEGER NOT NULL,
                CONSTRAINT product_types_pk PRIMARY KEY (product_type_id)
);


ALTER SEQUENCE public.product_types_product_type_id_seq OWNED BY public.product_types.product_type_id;

CREATE SEQUENCE public.order_details_order_details_id_seq;

CREATE TABLE public.order_details (
                order_details_id INTEGER NOT NULL DEFAULT nextval('public.order_details_order_details_id_seq'),
                product_id INTEGER NOT NULL,
                pedido_id INTEGER NOT NULL,
                quantity INTEGER NOT NULL,
                size VARCHAR(2) NOT NULL,
                CONSTRAINT order_details_pk PRIMARY KEY (order_details_id)
);


ALTER SEQUENCE public.order_details_order_details_id_seq OWNED BY public.order_details.order_details_id;

ALTER TABLE public.product_colors ADD CONSTRAINT colors_product_colors_fk
FOREIGN KEY (color_id)
REFERENCES public.colors (color_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.product_types ADD CONSTRAINT type_product_type_fk
FOREIGN KEY (type_id)
REFERENCES public.types (type_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.pedidos ADD CONSTRAINT users_pedidos_fk
FOREIGN KEY (customer_id)
REFERENCES public.customer (customer_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.address ADD CONSTRAINT users_address_fk
FOREIGN KEY (customer_id)
REFERENCES public.customer (customer_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.pedidos ADD CONSTRAINT address_pedidos_fk
FOREIGN KEY (id_address)
REFERENCES public.address (id_address)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.order_details ADD CONSTRAINT pedidos_order_details_fk
FOREIGN KEY (pedido_id)
REFERENCES public.pedidos (pedido_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.order_details ADD CONSTRAINT products_order_details_fk
FOREIGN KEY (product_id)
REFERENCES public.products (product_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.product_types ADD CONSTRAINT products_product_type_fk
FOREIGN KEY (product_id)
REFERENCES public.products (product_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.rating_star ADD CONSTRAINT products_rating_star_fk
FOREIGN KEY (product_id)
REFERENCES public.products (product_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.product_sizes ADD CONSTRAINT products_product_sizes_fk
FOREIGN KEY (product_id)
REFERENCES public.products (product_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.product_colors ADD CONSTRAINT products_product_colors_fk
FOREIGN KEY (product_id)
REFERENCES public.products (product_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

CREATE SEQUENCE public.pedidos_pedido_id_seq;

ALTER TABLE pedidos ALTER COLUMN pedido_id SET DEFAULT nextval('public.pedidos_pedido_id_seq');

-- INSERT PRODUTOS/TAMANHOS/TIPOS/CORES

INSERT INTO products (product_id, name, img_link, price, trademark, offer_percent, in_stock)
VALUES (1, 'Jeans 1', 'https://drive.google.com/uc?export=view&id=1injnXvoUAf3nud_x3geBbhsbl5pO3bUB', 220, 'Lacoste', 0.5, true);
INSERT INTO products (product_id, name, img_link, price, trademark, in_stock)
VALUES (2, 'Jeans 2', 'https://drive.google.com/uc?export=view&id=149NB4VwqD-CefPNOH75NSHIlUZ2wTQ4n', 250, 'Lacoste', false);
INSERT INTO products (product_id, name, img_link, price, trademark, offer_percent, in_stock)
VALUES (3, 'Jeans 3', 'https://drive.google.com/uc?export=view&id=1M1ZdEyDpLQhnvjEaHGiYf9uzkjiOoODp', 200, 'Lacoste', 0.3, true);
INSERT INTO products (product_id, name, img_link, price, trademark, in_stock)
VALUES (4, 'Shirt 1', 'https://drive.google.com/uc?export=view&id=1N9TaGQESa0ptyRs8hR6FcLZyptWZH6Ms', 70, 'Zara', true);
INSERT INTO products (product_id, name, img_link, price, trademark, offer_percent, in_stock)
VALUES (5, 'Shirt 2', 'https://drive.google.com/uc?export=view&id=1YbWwhQh2Nr7Qp9SfQTXi4-n3zWHUxgwa', 70, 'Zara', 0.5, true);
INSERT INTO products (product_id, name, img_link, price, trademark, in_stock)
VALUES (6, 'Shirt 3', 'https://drive.google.com/uc?export=view&id=1xwHif6Y_gbRE-SHWEIBqUfs0CZctoP9n', 70, 'Zara', true);
INSERT INTO products (product_id, name, img_link, price, trademark, offer_percent, in_stock)
VALUES (7, 'Sweater 1', 'https://drive.google.com/uc?export=view&id=1ts1lZOA1dpxvREVyGdmDV3q4iDCTGxXJ', 300, 'Adidas', 0.25, true);
INSERT INTO products (product_id, name, img_link, price, trademark, in_stock)
VALUES (8, 'Sweater 2', 'https://drive.google.com/uc?export=view&id=1QqpmsFWEt_7PFlOxhGUNTqAFjK-A2bRy', 280, 'Adidas', true);
INSERT INTO products (product_id, name, img_link, price, trademark, offer_percent, in_stock)
VALUES (9, 'Sweater 3', 'https://drive.google.com/uc?export=view&id=1AvgDbBGPmv8972xcB-xziIiLrlOXWktD', 280,'Adidas', 0.1,true);
INSERT INTO products (product_id, name, img_link, price, trademark, in_stock)
VALUES (10, 'Sweatpants 1', 'https://drive.google.com/uc?export=view&id=18DrAa2mFomIOup60lRDCBl7qg4iiaYu8', 195, 'Adidas', true);
INSERT INTO products (product_id, name, img_link, price, trademark, offer_percent, in_stock)
VALUES (11, 'Sweatpants 2', 'https://drive.google.com/uc?export=view&id=1tN1Jp3ZGbxDlSXQz6cetYUjpbwcX7GEt', 180, 'Adidas', 0.1, true);
INSERT INTO products (product_id, name, img_link, price, trademark, in_stock)
VALUES (12, 'Sweatpants 3', 'https://drive.google.com/uc?export=view&id=1qWCCv2lEhjGpyD1_Md7cxJhkqrvsKJMi', 195, 'Adidas', true);
INSERT INTO products (product_id, name, img_link, price, trademark, in_stock)
VALUES (13, 'Sweatshirt 1', 'https://drive.google.com/uc?export=view&id=1ajS0kyynxheRIURVMbi-BPF6VDWiQ0KB', 240, 'Lacoste', true);
INSERT INTO products (product_id, name, img_link, price, trademark, offer_percent,in_stock)
VALUES (14, 'Sweatshirt 2', 'https://drive.google.com/uc?export=view&id=1_bhtanhPa-M5c8gJcsNEJbvVRQY21jYk', 240, 'Lacoste', 0.4, true);
INSERT INTO products (product_id, name, img_link, price, trademark, in_stock)
VALUES (15, 'Sweatshirt 3', 'https://drive.google.com/uc?export=view&id=1Rq-Ka-Jl7veCJHms28dalwWLYdgWXDWN', 215, 'Lacoste', false);



INSERT INTO types (type_id, type)
VALUES (1, 'jeans');
INSERT INTO types (type_id, type)
VALUES (2, 'calça');
INSERT INTO types (type_id, type)
VALUES (3, 'moletom');
INSERT INTO types (type_id, type)
VALUES (4, 'suéter');
INSERT INTO types (type_id, type)
VALUES (5, 'camiseta');



INSERT INTO product_types (product_type_id, product_id, type_id)
VALUES (1, 1, 1);
INSERT INTO product_types (product_type_id, product_id, type_id)
VALUES (2, 2, 1);
INSERT INTO product_types (product_type_id, product_id, type_id)
VALUES (3, 3, 1);
INSERT INTO product_types (product_type_id, product_id, type_id)
VALUES (4, 4, 5);
INSERT INTO product_types (product_type_id, product_id, type_id)
VALUES (5, 5, 5);
INSERT INTO product_types (product_type_id, product_id, type_id)
VALUES (6, 6, 5);
INSERT INTO product_types (product_type_id, product_id, type_id)
VALUES (7, 7, 4);
INSERT INTO product_types (product_type_id, product_id, type_id)
VALUES (8, 8, 4);
INSERT INTO product_types (product_type_id, product_id, type_id)
VALUES (9, 9, 4);
INSERT INTO product_types (product_type_id, product_id, type_id)
VALUES (10, 10, 2);
INSERT INTO product_types (product_type_id, product_id, type_id)
VALUES (11, 11, 2);
INSERT INTO product_types (product_type_id, product_id, type_id)
VALUES (12, 12, 2);
INSERT INTO product_types (product_type_id, product_id, type_id)
VALUES (13, 13, 3);
INSERT INTO product_types (product_type_id, product_id, type_id)
VALUES (14, 14, 3);
INSERT INTO product_types (product_type_id, product_id, type_id)
VALUES (15, 15, 3);



INSERT INTO colors (color_id, color)
VALUES (1, 'azul claro');
INSERT INTO colors (color_id, color)
VALUES (2, 'azul escuro');
INSERT INTO colors (color_id, color)
VALUES (3, 'azul acizentado');
INSERT INTO colors (color_id, color)
VALUES (4, 'preto');
INSERT INTO colors (color_id, color)
VALUES (5, 'branco');
INSERT INTO colors (color_id, color)
VALUES (6, 'cinza claro');
INSERT INTO colors (color_id, color)
VALUES (7, 'bege');
INSERT INTO colors (color_id, color)
VALUES (8, 'verde claro');
INSERT INTO colors (color_id, color)
VALUES (9, 'verde escuro');
INSERT INTO colors (color_id, color)
VALUES (10, 'marrom');



INSERT INTO product_colors (product_color_id, product_id, color_id)
VALUES (1, 1, 1);
INSERT INTO product_colors (product_color_id, product_id, color_id)
VALUES (2, 2, 2);
INSERT INTO product_colors (product_color_id, product_id, color_id)
VALUES (3, 3, 3);
INSERT INTO product_colors (product_color_id, product_id, color_id)
VALUES (4, 4, 4);
INSERT INTO product_colors (product_color_id, product_id, color_id)
VALUES (5, 5, 5);
INSERT INTO product_colors (product_color_id, product_id, color_id)
VALUES (6, 6, 6);
INSERT INTO product_colors (product_color_id, product_id, color_id)
VALUES (7, 7, 6);
INSERT INTO product_colors (product_color_id, product_id, color_id)
VALUES (8, 8, 7);
INSERT INTO product_colors (product_color_id, product_id, color_id)
VALUES (9, 9, 4);
INSERT INTO product_colors (product_color_id, product_id, color_id)
VALUES (10, 10, 8);
INSERT INTO product_colors (product_color_id, product_id, color_id)
VALUES (11, 11, 9);
INSERT INTO product_colors (product_color_id, product_id, color_id)
VALUES (12, 12, 4);
INSERT INTO product_colors (product_color_id, product_id, color_id)
VALUES (13, 13, 10);
INSERT INTO product_colors (product_color_id, product_id, color_id)
VALUES (14, 14, 4);
INSERT INTO product_colors (product_color_id, product_id, color_id)
VALUES (15, 15, 6);



INSERT INTO product_sizes (product_id, p, m, g, gg)
VALUES (1, 100, 0, 100, 100);
INSERT INTO product_sizes (product_id, p, m, g, gg)
VALUES (2, 0, 0, 0, 0);
INSERT INTO product_sizes (product_id, p, m, g, gg)
VALUES (3, 100, 100, 100, 100);
INSERT INTO product_sizes (product_id, p, m, g, gg)
VALUES (4, 100, 100, 100, 100);
INSERT INTO product_sizes (product_id, p, m, g, gg)
VALUES (5, 100, 100, 100, 100);
INSERT INTO product_sizes (product_id, p, m, g, gg)
VALUES (6, 100, 100, 100, 100);
INSERT INTO product_sizes (product_id, p, m, g, gg)
VALUES (7, 100, 100, 100, 100);
INSERT INTO product_sizes (product_id, p, m, g, gg)
VALUES (8, 100, 100, 100, 100);
INSERT INTO product_sizes (product_id, p, m, g, gg)
VALUES (9, 100, 100, 100, 100);
INSERT INTO product_sizes (product_id, p, m, g, gg)
VALUES (10, 100, 100, 100, 100);
INSERT INTO product_sizes (product_id, p, m, g, gg)
VALUES (11, 100, 100, 100, 100);
INSERT INTO product_sizes (product_id, p, m, g, gg)
VALUES (12, 100, 100, 100, 100);
INSERT INTO product_sizes (product_id, p, m, g, gg)
VALUES (13, 100, 100, 100, 100);
INSERT INTO product_sizes (product_id, p, m, g, gg)
VALUES (14, 100, 100, 100, 100);
INSERT INTO product_sizes (product_id, p, m, g, gg)
VALUES (15, 0, 0, 0, 0);



INSERT INTO rating_star (product_id, one_star, two_star, three_star, four_star, five_star)
VALUES (1, 31, 28, 87, 49, 13);
INSERT INTO rating_star (product_id, one_star, two_star, three_star, four_star, five_star)
VALUES (2, 59, 3, 1, 40, 96);
INSERT INTO rating_star (product_id, one_star, two_star, three_star, four_star, five_star)
VALUES (3, 57, 64, 1, 70, 40);
INSERT INTO rating_star (product_id, one_star, two_star, three_star, four_star, five_star)
VALUES (4, 13, 3, 80, 97, 70);
INSERT INTO rating_star (product_id, one_star, two_star, three_star, four_star, five_star)
VALUES (5, 13, 3, 26, 70, 40);
INSERT INTO rating_star (product_id, one_star, two_star, three_star, four_star, five_star)
VALUES (6, 13, 3, 45, 40, 720);
INSERT INTO rating_star (product_id, one_star, two_star, three_star, four_star, five_star)
VALUES (7, 13, 3, 1, 420, 40);
INSERT INTO rating_star (product_id, one_star, two_star, three_star, four_star, five_star)
VALUES (8, 69, 3, 1, 40, 70);
INSERT INTO rating_star (product_id, one_star, two_star, three_star, four_star, five_star)
VALUES (9, 13, 2, 124, 70, 40);
INSERT INTO rating_star (product_id, one_star, two_star, three_star, four_star, five_star)
VALUES (10, 13, 3, 1, 40, 2000);
INSERT INTO rating_star (product_id, one_star, two_star, three_star, four_star, five_star)
VALUES (11, 13, 3, 1, 70, 40);
INSERT INTO rating_star (product_id, one_star, two_star, three_star, four_star, five_star)
VALUES (12, 13, 30, 1, 40, 70);
INSERT INTO rating_star (product_id, one_star, two_star, three_star, four_star, five_star)
VALUES (13, 13, 3, 100, 40, 70);
INSERT INTO rating_star (product_id, one_star, two_star, three_star, four_star, five_star)
VALUES (14, 13, 3, 1, 30, 40);
INSERT INTO rating_star (product_id, one_star, two_star, three_star, four_star, five_star)
VALUES (15, 13, 3, 79, 80, 80);