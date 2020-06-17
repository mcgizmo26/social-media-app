

const checkIfEmailExist = async (client, email) => {
    const res = await client.query(
        `Select email FROM application_schema.users WHERE email = $1`,
        [ email ]
    );

    return res.rows;
};

module.exports = { checkIfEmailExist };