/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
    return knex('students').del()
        .then(() => {
            return knex('students').insert([
                {
                    student_id: 11401,
                    student_name: 'Lizzie Scott',
                    student_age: 6,
                    student_gender: 'female',
                    student_grade: 1,
                    student_class: "01"
                },
                {
                    student_id: 11402,
                    student_name: 'Tom Merrick',
                    student_age: 6,
                    student_gender: 'male',
                    student_grade: 1,
                    student_class: "01"
                },
                {
                    student_id: 11403,
                    student_name: 'Hunter Beardsley',
                    student_age: 6,
                    student_gender: 'male',
                    student_grade: 1,
                    student_class: "02"
                },
                {
                    student_id: 11404,
                    student_name: 'Brody  Peretti',
                    student_age: 6,
                    student_gender: 'male',
                    student_grade: 1,
                    student_class: "02"
                }
            ])
        })
};