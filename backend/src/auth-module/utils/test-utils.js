const verifyAccessTokenGoogle = ({googleid, email, name
    , given_name,verified_email, family_name, picture} ) => {

        console.log("test verifyAccessTokenGoogle", googleid, email, name
        , given_name,verified_email, family_name, picture)

    return {
        id: googleid, //google id
        email: email,
        verified_email: verified_email,
        name: name,
        given_name: given_name,
        family_name: family_name,
        picture: picture,
        locale: 'en'
    }
}

module.exports = {verifyAccessTokenGoogle}