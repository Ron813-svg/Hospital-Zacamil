import nodemailer from "nodemailer";
import { config } from "../config.js";


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: config.email.email_user,
        pass: config.email.email_pass
    }
});
const sendMail = async (to, subject, text, html) => {
    try {
     
        const info = await transporter.sendMail({
            from: '"Hospital de Zacamil" <ricardo.mayorga.ck@gmail.com>',
            to,
            subject,
            text,
            html
        });
        return info;
    } catch (error) {
        console.log("Error sending recovery mail:", error);
        throw error;
    }
};
const HTMLRecoveryEmail = (code) => {
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Recuperación de Contraseña - Z Gas</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
            
            body {
                font-family: 'Poppins', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f6f9fc;
            }
            
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            }
            
            .header {
                background: linear-gradient(135deg, #1e5799 0%, #207cca 51%, #2989d8 100%);
                color: white;
                padding: 25px 20px;
                text-align: center;
            }
            
            .logo {
                margin-bottom: 15px;
            }
            
            .logo img {
                max-width: 150px;
                height: auto;
            }
            
            .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: 600;
                letter-spacing: 0.5px;
            }
            
            .content {
                padding: 30px;
                background-color: #ffffff;
            }
            
            .greeting {
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 20px;
                color: #1e5799;
            }
            
            p {
                margin: 0 0 15px;
                color: #4a4a4a;
            }
            
            .code-container {
                background-color: #f1f7ff;
                border-radius: 8px;
                margin: 25px 0;
                padding: 15px;
                border-left: 4px solid #1e5799;
            }
            
            .code {
                font-size: 32px;
                font-weight: 700;
                text-align: center;
                padding: 15px;
                margin: 10px 0;
                letter-spacing: 8px;
                color: #1e5799;
            }
            
            .code-info {
                text-align: center;
                font-size: 14px;
                color: #777;
            }
            
            .tip {
                background-color: #fffde7;
                border-radius: 8px;
                padding: 15px;
                margin: 20px 0;
                border-left: 4px solid #ffd54f;
            }
            
            .tip p {
                margin: 0;
                color: #5d4037;
                font-size: 14px;
            }
            
            .button-container {
                text-align: center;
                margin: 25px 0;
            }
            
            .button {
                display: inline-block;
                background: linear-gradient(135deg, #1e5799 0%, #207cca 100%);
                color: white;
                text-decoration: none;
                padding: 12px 30px;
                border-radius: 50px;
                font-weight: 600;
                font-size: 16px;
                transition: all 0.3s ease;
                box-shadow: 0 4px 10px rgba(30, 87, 153, 0.3);
            }
            
            .button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 15px rgba(30, 87, 153, 0.4);
            }
            
            .divider {
                height: 1px;
                background-color: #e0e0e0;
                margin: 25px 0;
            }
            
            .support {
                background-color: #f9f9f9;
                padding: 20px;
                border-radius: 8px;
                margin-top: 20px;
            }
            
            .support h3 {
                margin-top: 0;
                font-size: 16px;
                color: #1e5799;
            }
            
            .social-media {
                text-align: center;
                margin: 20px 0;
            }
            
            .social-icon {
                display: inline-block;
                margin: 0 10px;
                width: 36px;
                height: 36px;
                background-color: #1e5799;
                border-radius: 50%;
                text-align: center;
                line-height: 36px;
            }
            
            .footer {
                text-align: center;
                font-size: 12px;
                color: #777;
                padding: 20px;
                background-color: #f6f9fc;
                border-top: 1px solid #e0e0e0;
            }
            
            .address {
                margin-top: 10px;
                font-size: 11px;
            }
            
            @media only screen and (max-width: 600px) {
                .container {
                    margin: 0;
                    border-radius: 0;
                }
                
                .header {
                    padding: 15px;
                }
                
                .content {
                    padding: 20px;
                }
                
                .code {
                    font-size: 24px;
                    letter-spacing: 5px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">
                    <!-- Puedes reemplazar con tu logo real -->
                    <svg width="100" height="60" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100" height="60" rx="10" fill="#ffffff" fill-opacity="0.2"/>
                        <path d="M25 20H75M25 30H75M25 40H75" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
                        <circle cx="35" cy="30" r="10" fill="#ffffff" fill-opacity="0.5"/>
                        <text x="50" y="35" text-anchor="middle" font-size="16" font-weight="bold" fill="#ffffff">Z GAS</text>
                    </svg>
                </div>
                <h1>Recuperación de Contraseña</h1>
            </div>
            
            <div class="content">
                <div class="greeting">¡Hola!</div>
                
                <p>Hemos recibido una solicitud para recuperar la contraseña de tu cuenta en Z Gas. Para garantizar la seguridad de tu cuenta, necesitamos verificar que eres tú.</p>
                
                <div class="code-container">
                    <div class="code">${code}</div>
                    <div class="code-info">Usa este código para restablecer tu contraseña</div>
                </div>
                
                <p>Para completar el proceso de recuperación, ingresa el código anterior en la pantalla de recuperación de contraseña.</p>
                
                <div class="tip">
                    <p><strong>💡 Importante:</strong> Este código es válido por 30 minutos. Si no has solicitado este cambio, puedes ignorar este correo o contactar a nuestro soporte técnico.</p>
                </div>
                
                <div class="button-container">
                    <a href="#" class="button">Ir a Z Gas</a>
                </div>
                
                <div class="divider"></div>
                
                <p>Si tienes alguna pregunta o problema, no dudes en contactarnos. Estamos aquí para ayudarte.</p>
                
                <div class="support">
                    <h3>Soporte Técnico</h3>
                    <p>Teléfono: (123) 456-7890</p>
                    <p>Email: soporte@zgas.com</p>
                    <p>Horario: Lunes a Viernes, 8:00 AM - 6:00 PM</p>
                </div>
                
                <div class="social-media">
                    <!-- Facebook icon -->
                    <a href="#" class="social-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>
                    
                    <!-- Twitter/X icon -->
                    <a href="#" class="social-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 4C22 4 21.3 6.1 20 7.4C21.6 17.4 10.6 24.7 2 19C4.2 19.1 6.4 18.4 8 17C3 15.5 0.5 9.6 3 5C5.2 7.6 8.6 9.1 12 9C11.1 4.8 16 2.4 19 5.2C20.1 5.2 22 4 22 4Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>
                    
                    <!-- Instagram icon -->
                    <a href="#" class="social-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z" stroke="white" stroke-width="1.5"/>
                            <path d="M17.5 6.51L17.51 6.49889" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>
                </div>
            </div>
            
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} Z Gas. Todos los derechos reservados.</p>
                <p>Este es un correo electrónico automático, por favor no responda a este mensaje.</p>
                <div class="address">
                    Z Gas S.A. de C.V. | Av. Principal #123, Col. Centro, Ciudad de México | RFC: ZGA123456ABC
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
};

export { sendMail, HTMLRecoveryEmail };