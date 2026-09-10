import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";

export async function register(req: Request, res: Response) {
  /*#swagger.security = [{ "bearerAuth": [] }]
    #swagger.tags = ["Login"]
    #swagger.summary = "Registrar un usuario nuevo"
    #swagger.description= "registra a un usuario nuevo en el sistema"
    #swagger.requestBody ={
      required:true,
      schema:{
        $ref:"#/components/schemas/registerDTO"
      }
    }
  */
  try {
    const { nombre, email, password, rol } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.usuario.create({
      data: { nombre, email, password: hashedPassword, rol },
      select: { id: true, email: true, rol: true },
    });

    res.status(201).json(user);
  } catch {
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
}

export async function login(req: Request, res: Response) {
  /* 
    #swagger.tags = ["Login"]
    #swagger.summary = "Inicio de Sesion"
    #swagger.description= "Autentica a un usuario y retorna su JWT"
    #swagger.requestBody ={
      required:true,
      schema:{
        $ref:"#/components/schemas/loginDTO"
      }
    }
  */
  try {
    const { email, password } = req.body;
    const user = await prisma.usuario.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.rol },
      process.env.JWT_SECRET as string,
      { expiresIn: "5h" },
    );

    res.json({ token });
  } catch {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
}