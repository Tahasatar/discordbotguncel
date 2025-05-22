const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tvdkur')
    .setDescription('TVD karakter rolleri ve özel kanallarını oluşturur')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.reply({ content: 'TVD karakter rolleri ve kanalları oluşturuluyor...', ephemeral: true });

    const guild = interaction.guild;

    const karakterler = [
      'Damon Salvatore',
      'Stefan Salvatore',
      'Elena Gilbert',
      'Bonnie Bennett',
      'Caroline Forbes',
      'Klaus Mikaelson',
      'Elijah Mikaelson',
      'Rebekah Mikaelson',
      'Kol Mikaelson',
      'Finn Mikaelson',
      'Hope Mikaelson',
      'Hayley Marshall',
      'Kai Parker',
      'Enzo St. John',
      'Alaric Saltzman',
      'Matt Donovan',
      'Tyler Lockwood',
      'Jeremy Gilbert',
      'Lexi Branson',
      'Jo Laughlin',
      'Liz Forbes',
      'Lizzie Saltzman',
      'Josie Saltzman',
      'Landon Kirby',
      'Rafael Waithe',
      'MG (Milton Greasley)',
      'Kaleb Hawkins',
      'Penelope Park',
      'Jed Tien',
      'Sebastian',
    ];

    // Kategori oluştur
    const kategori = await guild.channels.create({
      name: 'TVD RP Kanalları',
      type: 4, // CATEGORY
    });

    for (const isim of karakterler) {
      // Rol oluştur
      const rol = await guild.roles.create({
        name: isim,
        reason: 'TVD RP kurulumu',
      });

      // Kanal adı için uygun formatlama
      const kanalAdi = isim.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');

      // Kanal oluştur
      await guild.channels.create({
        name: kanalAdi,
        type: 0, // GUILD_TEXT
        parent: kategori,
        permissionOverwrites: [
          {
            id: guild.id,
            deny: [PermissionFlagsBits.ViewChannel],
          },
          {
            id: rol.id,
            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
          },
        ],
      });
    }

    await interaction.editReply('✅ TVD karakter rolleri ve özel kanallar başarıyla oluşturuldu!');
  },
};