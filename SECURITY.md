# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

If you discover a security vulnerability in AlgoArena, please send an email to:
**[your.security.email@example.com]**

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We will respond within 48 hours and work with you to address the issue promptly.

## Security Best Practices

When using AlgoArena:
- Never commit `.env` files with sensitive credentials
- Use strong JWT secrets (minimum 32 characters)
- Keep dependencies updated
- Use HTTPS in production
- Implement rate limiting on public endpoints
- Sanitize all user inputs

Thank you for helping keep AlgoArena secure!
