module.exports = {
	name: "tagall",
	alias: ["everyone", "announce"],
	desc: "Tag all member",
	category: "group",
  async exec(RLink, m, { args }) {
		const { from, sender, isGroup, quoted } = m;
		const meta = isGroup ? await RLink.groupMetadata(from) : "";
		const groupMem = isGroup ? meta.participants : "";
		const admin = isGroup ? getAdmin(groupMem) : "";
		const cekAdmin = (m) => admin.includes(m);

		if (!isGroup) return await m.reply(`Only can be executed in group.`);
		if (!cekAdmin(sender))
			return await m.reply(`kamu bukan admin grup.`);
		let mems_id = new Array();
		let text = args.join(" ") + "\n\n";
		for (let i of groupMem) {
			text += `@${i.id.split("@")[0]}\n`;
			mems_id.push(i.id);
		}

		if (quoted) {
			await RLink.sendMessage(from, { text, mentions: mems_id }, { quoted });
		} else {
			await RLink.sendMessage(from, { text, mentions: mems_id }, { quoted: m });
		}
	},
};

function getAdmin(a) {
	let admins = new Array();
	for (let ids of a) {
		!ids.admin ? "" : admins.push(ids.id);
	}
	return admins;
}