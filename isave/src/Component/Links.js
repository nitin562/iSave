const base="https://isave-backend-1.onrender.com/"
// const base="http://localhost:9000/"
const links={
    login:`${base}api/auth/login`,
    sign:`${base}api/auth/sign`,
    addNote:`${base}api/data/note`,
    getNotes:`${base}api/data/notes`,
    Decode:`${base}api/data/DecodeNote`,
    updateNote:`${base}api/data/note`,
    extract:`${base}api/data/extractText`,
    changeKey:`${base}api/data/key`,

    QA:`${base}api/security/QA`,
    Q:`${base}api/security/ques`,
    A:`${base}api/security/ans`
}
export default links