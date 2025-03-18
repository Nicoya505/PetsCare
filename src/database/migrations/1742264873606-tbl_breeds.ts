import { MigrationInterface, QueryRunner } from "typeorm";

export class TblBreeds1742264873606 implements MigrationInterface {
    name = 'TblBreeds1742264873606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "breeds" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_d48d1b0f8440b750b1d6dd7f5d3" UNIQUE ("name"), CONSTRAINT "PK_e89f6e1fbb29d28623b4feb2b3e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "breeds"`);
    }

}
