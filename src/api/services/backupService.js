const fs = require('fs').promises;
const path = require('path');
const cron = require('node-cron');
const ExportService = require('./exportService');

const BACKUP_FOLDER = path.join(process.cwd(), 'backups');

const ensureBackupFolder = async () => {
  await fs.mkdir(BACKUP_FOLDER, { recursive: true });
};

const buildBackupFilename = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `backup-${year}-${month}-${day}.csv`;
};

const saveBackupCsv = async () => {
  const data = await ExportService.getExportData();
  const csv = await ExportService.generateCsv(data);
  await ensureBackupFolder();
  const filename = path.join(BACKUP_FOLDER, buildBackupFilename());
  await fs.writeFile(filename, csv, 'utf8');
  console.log(`Backup CSV salvo em: ${filename}`);
};

const scheduleDailyBackup = () => {
  cron.schedule('0 17 * * *', async () => {
    try {
      await saveBackupCsv();
    } catch (err) {
      console.error('Erro ao gerar backup CSV:', err.message);
    }
  }, {
    timezone: 'America/Sao_Paulo',
  });
};

module.exports = {
  saveBackupCsv,
  scheduleDailyBackup,
};
