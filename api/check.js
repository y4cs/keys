export default function handler(req, res) {
    // السماح بالطلبات القادمة عبر POST فقط
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    const { key } = req.body || {};

    // قائمة المفاتيح: يمكنك إضافة وتعديل المفاتيح من هنا مباشرة
    const keys = [
        { key: "VIP-2026-ABC", expires: "2026-12-31", banned: false },
        { key: "TEST-KEY-123", expires: "2025-01-01", banned: false }
    ];

    const foundKey = keys.find(k => k.key === key);

    if (!foundKey) {
        return res.status(200).json({ success: false, message: 'المفتاح غير موجود!' });
    }

    if (foundKey.banned) {
        return res.status(200).json({ success: false, message: 'هذا المفتاح محظور (باند)!' });
    }

    const currentDate = new Date();
    const expDate = new Date(foundKey.expires);

    if (currentDate > expDate) {
        return res.status(200).json({ success: false, message: 'انتهت صلاحية هذا المفتاح!' });
    }

    return res.status(200).json({ success: true, message: 'تم التحقق بنجاح' });
}
