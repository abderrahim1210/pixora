<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset your password</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f7; -webkit-font-smoothing: antialiased;">

    <table width="100%" cellpadding="0" cellspacing="0" style="width: 100%; margin: 0; padding: 40px 0; background-color: #f4f4f7;">
        <tr>
            <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e1e4e8; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    
                    <tr>
                        <td align="center" style="padding: 40px 0 20px;">
                            <h1 style="margin: 0; font-size: 28px; color: rgb(0, 120, 255); letter-spacing: -0.5px;">Pixora</h1>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 0 40px 30px; color: #4a4a4a; font-size: 16px; line-height: 26px;">
                            <h2 style="color: #1a1a1a; font-size: 20px; margin-bottom: 20px;">Reset your password</h2>
                            <p style="margin: 0 0 20px;">You've requested to reset your password for your Pixora account. Click the button below to choose a new one. This link will expire shortly.</p>
                            
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="padding: 10px 0 30px;">
                                        <a href="{{ $url }}" style="display: inline-block; padding: 14px 28px; background-color: rgb(0, 120, 255); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Reset Password</a>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 0; font-size: 14px; color: #999;">If you didn't request this, you can safely ignore this email.</p>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding: 25px; background-color: #fafafa; border-top: 1px solid #eee; font-size: 12px; color: #777;">
                            &copy; {{ date('Y') }} Pixora. All rights reserved.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>