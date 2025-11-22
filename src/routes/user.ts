import { Router } from "express";
import { prisma } from "../prisma.js";

const router = Router();

router.get("/profile", async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
