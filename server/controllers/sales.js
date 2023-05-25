import OverallStat from "../models/OverallStat.js";

async function getSales(req, res) {
  try {
    const overallStats = await OverallStat.find();

    res.status(200).json(overallStats[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export { getSales };
