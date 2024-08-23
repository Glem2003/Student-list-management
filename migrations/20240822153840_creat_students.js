/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('students', table => {
            table.integer('student_id').primary();
            table.string('student_name');
            table.integer('student_age');
            table.string('student_gender');
            table.integer('student_grade');
            table.string('student_class');
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable('students')
};
