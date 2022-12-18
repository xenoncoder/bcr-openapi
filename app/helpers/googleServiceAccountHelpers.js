require('dotenv').config();

const {
  SERVICE_ACCOUNT_PROJECT_ID,
  SERVICE_ACCOUNT_PRIVATE_KEY_ID,
  SERVICE_ACCOUNT_PRIVATE_KEY,
  SERVICE_ACCOUNT_CLIENT_EMAIL,
  SERVICE_ACCOUNT_CLIENT_ID,
  SERVICE_ACCOUNT_CLIENT_CERT,
} = process.env;

const serviceAccount = {
  type: 'service_account',
  project_id: SERVICE_ACCOUNT_PROJECT_ID,
  private_key_id: SERVICE_ACCOUNT_PRIVATE_KEY_ID,
  private_key: SERVICE_ACCOUNT_PRIVATE_KEY,
  client_email: SERVICE_ACCOUNT_CLIENT_EMAIL,
  client_id: SERVICE_ACCOUNT_CLIENT_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: SERVICE_ACCOUNT_CLIENT_CERT,
};

module.exports = serviceAccount;
