
function logout (req, res) {
    // Clear the token cookie
    res.cookie("token", "", { expires: new Date(0), httpOnly: true });
    return res.status(200).json({ message: "Logout successful." });
}
export {logout};