const DEVS = ["Ultimateutkarsh11", "VaibhavArora314", "goyalh4164", "TruecoderSri", "karanchhillar", "bpnt"]

async function  teams (req, res) {
    const team = DEVS;
    return res.status(200).json({
      team,
    });
  }
export {teams};