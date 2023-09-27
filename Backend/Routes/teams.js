async function  teams (req, res) {
    const team = process.env.DEVS.split(" ");
    return res.status(200).json({
      team,
    });
  }
export {teams};