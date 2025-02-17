const path = require('path')

module.exports = {
  STAGING_FOLDER: '1BaNehgsn3E7sR5lpnB-3fbx0C_tbWYhD', // https://drive.google.com/drive/u/1/folders/1BaNehgsn3E7sR5lpnB-3fbx0C_tbWYhD
  BK_FOLDER_ID: '1y52Nd4dWi1v9DkzKy05Hd6KikReUu2-Y', // https://drive.google.com/drive/u/1/folders/1y52Nd4dWi1v9DkzKy05Hd6KikReUu2-Y
  LAST_ID_SHEET: '1Fbk5_5crBi4k7QTXpCQZ9VJ01N2901u43-4_fsckMCg', // https://docs.google.com/spreadsheets/d/1Fbk5_5crBi4k7QTXpCQZ9VJ01N2901u43-4_fsckMCg/edit?gid=0#gid=0
  TOKEN_PATH: path.join(__dirname, './googleapi/token.json'),
  CREDENTIAL_PATH: path.join(__dirname, './googleapi/credentials.json'),
  I18N_PATH: './lang',
  EXCEL_PATH: './localization',
  LANG_SUPPORT: 'ja,en,th,zh,tw,vi',
  LANG_DEFAULT: 'ja',
  NS_DEFAULT: 'translation',
  LANG_FALLBACK: 'ja',
  REF_ROW: 2,
  REF_CELL: 10,
  FORMAT_TYPE: 'VUE', // (REACT|VUE)
}

