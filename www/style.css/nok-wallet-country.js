/**
 * NOK Super - Country/currency config for Wallet & Add Money.
 * All countries from Settings (Region) with currency and rate to BDT.
 * 1 USD = 115 BDT; localPerBdt = local units per 1 BDT.
 */
(function(global) {
    var BDT_PER_USD = 115;
    // currency: display symbol, code: ISO 4217, localPerBdt: local units per 1 BDT
    var C = {
        AF: { currency: '؋', code: 'AFN', localPerBdt: 70/BDT_PER_USD },
        AL: { currency: 'L', code: 'ALL', localPerBdt: 95/BDT_PER_USD },
        DZ: { currency: 'د.ج', code: 'DZD', localPerBdt: 134/BDT_PER_USD },
        AD: { currency: '€', code: 'EUR', localPerBdt: 0.92/BDT_PER_USD },
        AO: { currency: 'Kz', code: 'AOA', localPerBdt: 830/BDT_PER_USD },
        AG: { currency: '$', code: 'XCD', localPerBdt: 2.7/BDT_PER_USD },
        AR: { currency: '$', code: 'ARS', localPerBdt: 900/BDT_PER_USD },
        AM: { currency: '֏', code: 'AMD', localPerBdt: 400/BDT_PER_USD },
        AU: { currency: '$', code: 'AUD', localPerBdt: 1.53/BDT_PER_USD },
        AT: { currency: '€', code: 'EUR', localPerBdt: 0.92/BDT_PER_USD },
        AZ: { currency: '₼', code: 'AZN', localPerBdt: 1.7/BDT_PER_USD },
        BS: { currency: '$', code: 'BSD', localPerBdt: 1/BDT_PER_USD },
        BH: { currency: 'د.ب', code: 'BHD', localPerBdt: 0.376/BDT_PER_USD },
        BD: { currency: '৳', code: 'BDT', localPerBdt: 1 },
        BB: { currency: '$', code: 'BBD', localPerBdt: 2/BDT_PER_USD },
        BY: { currency: 'Br', code: 'BYN', localPerBdt: 3.2/BDT_PER_USD },
        BE: { currency: '€', code: 'EUR', localPerBdt: 0.92/BDT_PER_USD },
        BZ: { currency: '$', code: 'BZD', localPerBdt: 2/BDT_PER_USD },
        BJ: { currency: 'CFA', code: 'XOF', localPerBdt: 600/BDT_PER_USD },
        BT: { currency: 'Nu', code: 'BTN', localPerBdt: 83/BDT_PER_USD },
        BO: { currency: 'Bs', code: 'BOB', localPerBdt: 6.9/BDT_PER_USD },
        BA: { currency: 'KM', code: 'BAM', localPerBdt: 1.8/BDT_PER_USD },
        BW: { currency: 'P', code: 'BWP', localPerBdt: 13.6/BDT_PER_USD },
        BR: { currency: 'R$', code: 'BRL', localPerBdt: 5/BDT_PER_USD },
        BN: { currency: '$', code: 'BND', localPerBdt: 1.34/BDT_PER_USD },
        BG: { currency: 'лв', code: 'BGN', localPerBdt: 1.8/BDT_PER_USD },
        BF: { currency: 'CFA', code: 'XOF', localPerBdt: 600/BDT_PER_USD },
        BI: { currency: 'FBu', code: 'BIF', localPerBdt: 2850/BDT_PER_USD },
        KH: { currency: '៛', code: 'KHR', localPerBdt: 4100/BDT_PER_USD },
        CM: { currency: 'FCFA', code: 'XAF', localPerBdt: 600/BDT_PER_USD },
        CA: { currency: '$', code: 'CAD', localPerBdt: 1.36/BDT_PER_USD },
        CV: { currency: '$', code: 'CVE', localPerBdt: 102/BDT_PER_USD },
        CF: { currency: 'FCFA', code: 'XAF', localPerBdt: 600/BDT_PER_USD },
        TD: { currency: 'FCFA', code: 'XAF', localPerBdt: 600/BDT_PER_USD },
        CL: { currency: '$', code: 'CLP', localPerBdt: 950/BDT_PER_USD },
        CN: { currency: '¥', code: 'CNY', localPerBdt: 7.24/BDT_PER_USD },
        CO: { currency: '$', code: 'COP', localPerBdt: 4000/BDT_PER_USD },
        KM: { currency: 'CF', code: 'KMF', localPerBdt: 450/BDT_PER_USD },
        CG: { currency: 'FCFA', code: 'XAF', localPerBdt: 600/BDT_PER_USD },
        CR: { currency: '₡', code: 'CRC', localPerBdt: 530/BDT_PER_USD },
        HR: { currency: '€', code: 'EUR', localPerBdt: 0.92/BDT_PER_USD },
        CU: { currency: '$', code: 'CUP', localPerBdt: 24/BDT_PER_USD },
        CY: { currency: '€', code: 'EUR', localPerBdt: 0.92/BDT_PER_USD },
        CZ: { currency: 'Kč', code: 'CZK', localPerBdt: 23/BDT_PER_USD },
        DK: { currency: 'kr', code: 'DKK', localPerBdt: 6.9/BDT_PER_USD },
        DJ: { currency: 'Fdj', code: 'DJF', localPerBdt: 178/BDT_PER_USD },
        DM: { currency: '$', code: 'XCD', localPerBdt: 2.7/BDT_PER_USD },
        DO: { currency: '$', code: 'DOP', localPerBdt: 56/BDT_PER_USD },
        EC: { currency: '$', code: 'USD', localPerBdt: 1/BDT_PER_USD },
        EG: { currency: 'E£', code: 'EGP', localPerBdt: 49/BDT_PER_USD },
        SV: { currency: '$', code: 'USD', localPerBdt: 1/BDT_PER_USD },
        GQ: { currency: 'FCFA', code: 'XAF', localPerBdt: 600/BDT_PER_USD },
        ER: { currency: 'Nfk', code: 'ERN', localPerBdt: 15/BDT_PER_USD },
        EE: { currency: '€', code: 'EUR', localPerBdt: 0.92/BDT_PER_USD },
        ET: { currency: 'Br', code: 'ETB', localPerBdt: 56/BDT_PER_USD },
        FJ: { currency: '$', code: 'FJD', localPerBdt: 2.25/BDT_PER_USD },
        FI: { currency: '€', code: 'EUR', localPerBdt: 0.92/BDT_PER_USD },
        FR: { currency: '€', code: 'EUR', localPerBdt: 0.92/BDT_PER_USD },
        GA: { currency: 'FCFA', code: 'XAF', localPerBdt: 600/BDT_PER_USD },
        GM: { currency: 'D', code: 'GMD', localPerBdt: 60/BDT_PER_USD },
        GE: { currency: '₾', code: 'GEL', localPerBdt: 2.7/BDT_PER_USD },
        DE: { currency: '€', code: 'EUR', localPerBdt: 0.92/BDT_PER_USD },
        GH: { currency: '₵', code: 'GHS', localPerBdt: 12.5/BDT_PER_USD },
        GR: { currency: '€', code: 'EUR', localPerBdt: 0.92/BDT_PER_USD },
        GD: { currency: '$', code: 'XCD', localPerBdt: 2.7/BDT_PER_USD },
        GT: { currency: 'Q', code: 'GTQ', localPerBdt: 7.8/BDT_PER_USD },
        GN: { currency: 'FG', code: 'GNF', localPerBdt: 8600/BDT_PER_USD },
        GW: { currency: 'CFA', code: 'XOF', localPerBdt: 600/BDT_PER_USD },
        GY: { currency: '$', code: 'GYD', localPerBdt: 209/BDT_PER_USD },
        HT: { currency: 'G', code: 'HTG', localPerBdt: 132/BDT_PER_USD },
        HN: { currency: 'L', code: 'HNL', localPerBdt: 24.7/BDT_PER_USD },
        HK: { currency: '$', code: 'HKD', localPerBdt: 7.82/BDT_PER_USD },
        HU: { currency: 'Ft', code: 'HUF', localPerBdt: 360/BDT_PER_USD },
        IS: { currency: 'kr', code: 'ISK', localPerBdt: 138/BDT_PER_USD },
        IN: { currency: '₹', code: 'INR', localPerBdt: 83/BDT_PER_USD },
        ID: { currency: 'Rp', code: 'IDR', localPerBdt: 15700/BDT_PER_USD },
        IR: { currency: '﷼', code: 'IRR', localPerBdt: 42000/BDT_PER_USD },
        IQ: { currency: 'ع.د', code: 'IQD', localPerBdt: 1310/BDT_PER_USD },
        IE: { currency: '€', code: 'EUR', localPerBdt: 0.92/BDT_PER_USD },
        IL: { currency: '₪', code: 'ILS', localPerBdt: 3.7/BDT_PER_USD },
        IT: { currency: '€', code: 'EUR', localPerBdt: 0.92/BDT_PER_USD },
        JM: { currency: '$', code: 'JMD', localPerBdt: 155/BDT_PER_USD },
        JP: { currency: '¥', code: 'JPY', localPerBdt: 150/BDT_PER_USD },
        JO: { currency: 'د.ا', code: 'JOD', localPerBdt: 0.71/BDT_PER_USD },
        KZ: { currency: '₸', code: 'KZT', localPerBdt: 450/BDT_PER_USD },
        KE: { currency: 'KSh', code: 'KES', localPerBdt: 128/BDT_PER_USD },
        KI: { currency: '$', code: 'AUD', localPerBdt: 1.53/BDT_PER_USD },
        KP: { currency: '₩', code: 'KPW', localPerBdt: 900/BDT_PER_USD },
        KR: { currency: '₩', code: 'KRW', localPerBdt: 1350/BDT_PER_USD },
        KW: { currency: 'د.ك', code: 'KWD', localPerBdt: 0.31/BDT_PER_USD },
        KG: { currency: 'с', code: 'KGS', localPerBdt: 89/BDT_PER_USD },
        LA: { currency: '₭', code: 'LAK', localPerBdt: 20500/BDT_PER_USD },
        LV: { currency: '€', code: 'EUR', localPerBdt: 0.92/BDT_PER_USD },
        LB: { currency: 'ل.ل', code: 'LBP', localPerBdt: 89500/BDT_PER_USD },
        LS: { currency: 'L', code: 'LSL', localPerBdt: 18.5/BDT_PER_USD },
        LR: { currency: '$', code: 'LRD', localPerBdt: 192/BDT_PER_USD },
        LY: { currency: 'ل.د', code: 'LYD', localPerBdt: 4.85/BDT_PER_USD },
        LI: { currency: 'CHF', code: 'CHF', localPerBdt: 0.88/BDT_PER_USD },
        LT: { currency: '€', code: 'EUR', localPerBdt: 0.92/BDT_PER_USD },
        LU: { currency: '€', code: 'EUR', localPerBdt: 0.92/BDT_PER_USD },
        MO: { currency: 'MOP$', code: 'MOP', localPerBdt: 8/BDT_PER_USD },
        MG: { currency: 'Ar', code: 'MGA', localPerBdt: 4500/BDT_PER_USD },
        MW: { currency: 'MK', code: 'MWK', localPerBdt: 1750/BDT_PER_USD },
        MY: { currency: 'RM', code: 'MYR', localPerBdt: 4.72/BDT_PER_USD },
        MV: { currency: 'Rf', code: 'MVR', localPerBdt: 15.4/BDT_PER_USD },
        ML: { currency: 'CFA', code: 'XOF', localPerBdt: 600/BDT_PER_USD },
        MT: { currency: '€', code: 'EUR', localPerBdt: 0.92/BDT_PER_USD },
        MH: { currency: '$', code: 'USD', localPerBdt: 1/BDT_PER_USD },
        MR: { currency: 'UM', code: 'MRU', localPerBdt: 40/BDT_PER_USD },
        MU: { currency: '₨', code: 'MUR', localPerBdt: 45/BDT_PER_USD },
        MX: { currency: '$', code: 'MXN', localPerBdt: 17/BDT_PER_USD },
        FM: { currency: '$', code: 'USD', localPerBdt: 1/BDT_PER_USD },
        MD: { currency: 'L', code: 'MDL', localPerBdt: 18/BDT_PER_USD },
        MC: { currency: '€', code: 'EUR', localPerBdt: 0.92/BDT_PER_USD },
        MN: { currency: '₮', code: 'MNT', localPerBdt: 3450/BDT_PER_USD },
        ME: { currency: '€', code: 'EUR', localPerBdt: 0.92/BDT_PER_USD },
        MA: { currency: 'د.م.', code: 'MAD', localPerBdt: 10/BDT_PER_USD },
        MZ: { currency: 'MT', code: 'MZN', localPerBdt: 64/BDT_PER_USD },
        MM: { currency: 'K', code: 'MMK', localPerBdt: 2100/BDT_PER_USD },
        NA: { currency: '$', code: 'NAD', localPerBdt: 18.5/BDT_PER_USD },
        NR: { currency: '$', code: 'AUD', localPerBdt: 1.53/BDT_PER_USD },
        NP: { currency: '₨', code: 'NPR', localPerBdt: 133/BDT_PER_USD },
        NL: { currency: '€', code: 'EUR', localPerBdt: 0.92/BDT_PER_USD },
        NZ: { currency: '$', code: 'NZD', localPerBdt: 1.64/BDT_PER_USD },
        NI: { currency: 'C$', code: 'NIO', localPerBdt: 36.5/BDT_PER_USD },
        NE: { currency: 'CFA', code: 'XOF', localPerBdt: 600/BDT_PER_USD },
        NG: { currency: '₦', code: 'NGN', localPerBdt: 1600/BDT_PER_USD },
        MK: { currency: 'ден', code: 'MKD', localPerBdt: 56/BDT_PER_USD },
        NO: { currency: 'kr', code: 'NOK', localPerBdt: 10.7/BDT_PER_USD },
        OM: { currency: 'ر.ع.', code: 'OMR', localPerBdt: 0.385/BDT_PER_USD },
        PK: { currency: '₨', code: 'PKR', localPerBdt: 320/BDT_PER_USD },
        PW: { currency: '$', code: 'USD', localPerBdt: 1/BDT_PER_USD },
        PS: { currency: '₪', code: 'ILS', localPerBdt: 3.7/BDT_PER_USD },
        PA: { currency: 'B/.', code: 'PAB', localPerBdt: 1/BDT_PER_USD },
        PG: { currency: 'K', code: 'PGK', localPerBdt: 3.75/BDT_PER_USD },
        PY: { currency: '₲', code: 'PYG', localPerBdt: 7350/BDT_PER_USD },
        PE: { currency: 'S/', code: 'PEN', localPerBdt: 3.72/BDT_PER_USD },
        PH: { currency: '₱', code: 'PHP', localPerBdt: 56/BDT_PER_USD },
        PL: { currency: 'zł', code: 'PLN', localPerBdt: 4/BDT_PER_USD },
        PT: { currency: '€', code: 'EUR', localPerBdt: 0.92/BDT_PER_USD },
        QA: { currency: 'ر.ق', code: 'QAR', localPerBdt: 3.64/BDT_PER_USD },
        RO: { currency: 'lei', code: 'RON', localPerBdt: 4.6/BDT_PER_USD },
        RU: { currency: '₽', code: 'RUB', localPerBdt: 100/BDT_PER_USD },
        RW: { currency: 'FRw', code: 'RWF', localPerBdt: 1280/BDT_PER_USD },
        KN: { currency: '$', code: 'XCD', localPerBdt: 2.7/BDT_PER_USD },
        LC: { currency: '$', code: 'XCD', localPerBdt: 2.7/BDT_PER_USD },
        VC: { currency: '$', code: 'XCD', localPerBdt: 2.7/BDT_PER_USD },
        WS: { currency: 'T', code: 'WST', localPerBdt: 2.75/BDT_PER_USD },
        SM: { currency: '€', code: 'EUR', localPerBdt: 0.92/BDT_PER_USD },
        ST: { currency: 'Db', code: 'STN', localPerBdt: 22.5/BDT_PER_USD },
        SA: { currency: '﷼', code: 'SAR', localPerBdt: 3.75/BDT_PER_USD },
        SN: { currency: 'CFA', code: 'XOF', localPerBdt: 600/BDT_PER_USD },
        RS: { currency: 'дин.', code: 'RSD', localPerBdt: 108/BDT_PER_USD },
        SC: { currency: '₨', code: 'SCR', localPerBdt: 13.5/BDT_PER_USD },
        SL: { currency: 'Le', code: 'SLL', localPerBdt: 22500/BDT_PER_USD },
        SG: { currency: '$', code: 'SGD', localPerBdt: 1.34/BDT_PER_USD },
        SK: { currency: '€', code: 'EUR', localPerBdt: 0.92/BDT_PER_USD },
        SI: { currency: '€', code: 'EUR', localPerBdt: 0.92/BDT_PER_USD },
        SB: { currency: '$', code: 'SBD', localPerBdt: 8.4/BDT_PER_USD },
        SO: { currency: 'Sh', code: 'SOS', localPerBdt: 570/BDT_PER_USD },
        ZA: { currency: 'R', code: 'ZAR', localPerBdt: 18.5/BDT_PER_USD },
        SS: { currency: '£', code: 'SSP', localPerBdt: 1300/BDT_PER_USD },
        ES: { currency: '€', code: 'EUR', localPerBdt: 0.92/BDT_PER_USD },
        LK: { currency: 'Rs', code: 'LKR', localPerBdt: 325/BDT_PER_USD },
        SD: { currency: 'ج.س.', code: 'SDG', localPerBdt: 600/BDT_PER_USD },
        SR: { currency: '$', code: 'SRD', localPerBdt: 32/BDT_PER_USD },
        SE: { currency: 'kr', code: 'SEK', localPerBdt: 10.6/BDT_PER_USD },
        CH: { currency: 'CHF', code: 'CHF', localPerBdt: 0.88/BDT_PER_USD },
        SY: { currency: '£', code: 'SYP', localPerBdt: 13000/BDT_PER_USD },
        TW: { currency: '$', code: 'TWD', localPerBdt: 31.5/BDT_PER_USD },
        TJ: { currency: 'ЅМ', code: 'TJS', localPerBdt: 11/BDT_PER_USD },
        TZ: { currency: 'TSh', code: 'TZS', localPerBdt: 2520/BDT_PER_USD },
        TH: { currency: '฿', code: 'THB', localPerBdt: 35/BDT_PER_USD },
        TL: { currency: '$', code: 'USD', localPerBdt: 1/BDT_PER_USD },
        TG: { currency: 'CFA', code: 'XOF', localPerBdt: 600/BDT_PER_USD },
        TO: { currency: 'T$', code: 'TOP', localPerBdt: 2.35/BDT_PER_USD },
        TT: { currency: 'TT$', code: 'TTD', localPerBdt: 6.8/BDT_PER_USD },
        TN: { currency: 'د.ت', code: 'TND', localPerBdt: 3.1/BDT_PER_USD },
        TR: { currency: '₺', code: 'TRY', localPerBdt: 32/BDT_PER_USD },
        TM: { currency: 'm', code: 'TMT', localPerBdt: 3.5/BDT_PER_USD },
        TV: { currency: '$', code: 'AUD', localPerBdt: 1.53/BDT_PER_USD },
        UG: { currency: 'USh', code: 'UGX', localPerBdt: 3800/BDT_PER_USD },
        UA: { currency: '₴', code: 'UAH', localPerBdt: 41/BDT_PER_USD },
        AE: { currency: 'AED', code: 'AED', localPerBdt: 3.67/BDT_PER_USD },
        GB: { currency: '£', code: 'GBP', localPerBdt: 0.79/BDT_PER_USD },
        US: { currency: '$', code: 'USD', localPerBdt: 1/BDT_PER_USD },
        UY: { currency: '$', code: 'UYU', localPerBdt: 39/BDT_PER_USD },
        UZ: { currency: 'so\'m', code: 'UZS', localPerBdt: 12400/BDT_PER_USD },
        VU: { currency: 'VT', code: 'VUV', localPerBdt: 120/BDT_PER_USD },
        VA: { currency: '€', code: 'EUR', localPerBdt: 0.92/BDT_PER_USD },
        VE: { currency: 'Bs.S', code: 'VES', localPerBdt: 36/BDT_PER_USD },
        VN: { currency: '₫', code: 'VND', localPerBdt: 24500/BDT_PER_USD },
        YE: { currency: '﷼', code: 'YER', localPerBdt: 250/BDT_PER_USD },
        ZM: { currency: 'ZK', code: 'ZMW', localPerBdt: 27/BDT_PER_USD },
        ZW: { currency: '$', code: 'USD', localPerBdt: 1/BDT_PER_USD },
        OTHER: { currency: '$', code: 'USD', localPerBdt: 1/BDT_PER_USD }
    };

    function getWalletConfig(region) {
        var r = (region || (typeof localStorage !== 'undefined' && localStorage.getItem('nokRegion')) || 'BD').toUpperCase();
        return C[r] || C.US;
    }

    /** Default payment methods for all countries (when no special list). */
    var defaultPayments = [
        { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
        { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'Local banks' },
        { method: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Digital wallet' },
        { method: 'applepay', icon: '🍎', name: 'Apple Pay', desc: 'Digital wallet' }
    ];

    var specialPayments = {
        BD: [
            { method: 'bkash', icon: '📱', name: 'bKash', desc: 'Mobile wallet' },
            { method: 'nagad', icon: '📲', name: 'Nagad', desc: 'Mobile wallet' },
            { method: 'rocket', icon: '🚀', name: 'Rocket', desc: 'Mobile banking' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'Net banking' },
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' }
        ],
        IN: [
            { method: 'upi', icon: '📱', name: 'UPI', desc: 'GPay, PhonePe, Paytm' },
            { method: 'paytm', icon: '💳', name: 'Paytm', desc: 'Wallet' },
            { method: 'phonepe', icon: '📲', name: 'PhonePe', desc: 'Wallet' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'Net banking' },
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' }
        ],
        AE: [
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'Local banks' },
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'applepay', icon: '🍎', name: 'Apple Pay', desc: 'Digital wallet' },
            { method: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Digital wallet' }
        ],
        US: [
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard, Amex' },
            { method: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Digital wallet' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'ACH / Wire' },
            { method: 'applepay', icon: '🍎', name: 'Apple Pay', desc: 'Digital wallet' }
        ],
        GB: [
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'Faster Payment' },
            { method: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Digital wallet' },
            { method: 'applepay', icon: '🍎', name: 'Apple Pay', desc: 'Digital wallet' }
        ],
        SA: [
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'Local banks' },
            { method: 'card', icon: '💳', name: 'Card / Mada', desc: 'Visa, Mastercard' },
            { method: 'applepay', icon: '🍎', name: 'Apple Pay', desc: 'Digital wallet' }
        ],
        PK: [
            { method: 'jazzcash', icon: '📱', name: 'JazzCash', desc: 'Mobile wallet' },
            { method: 'easypaisa', icon: '📲', name: 'EasyPaisa', desc: 'Mobile wallet' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'Net banking' },
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' }
        ],
        CA: [
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'Interac e-Transfer' },
            { method: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Digital wallet' },
            { method: 'applepay', icon: '🍎', name: 'Apple Pay', desc: 'Digital wallet' }
        ],
        AU: [
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'PayID / BSB' },
            { method: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Digital wallet' },
            { method: 'applepay', icon: '🍎', name: 'Apple Pay', desc: 'Digital wallet' }
        ],
        DE: [
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'SEPA' },
            { method: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Digital wallet' },
            { method: 'applepay', icon: '🍎', name: 'Apple Pay', desc: 'Digital wallet' }
        ],
        FR: [
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'SEPA' },
            { method: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Digital wallet' },
            { method: 'applepay', icon: '🍎', name: 'Apple Pay', desc: 'Digital wallet' }
        ],
        SG: [
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'PayNow / Local banks' },
            { method: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Digital wallet' },
            { method: 'applepay', icon: '🍎', name: 'Apple Pay', desc: 'Digital wallet' }
        ],
        MY: [
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'FPX / Local banks' },
            { method: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Digital wallet' },
            { method: 'applepay', icon: '🍎', name: 'Apple Pay', desc: 'Digital wallet' }
        ],
        EG: [
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'Local banks' },
            { method: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Digital wallet' }
        ],
        KW: [
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'Local banks' },
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'applepay', icon: '🍎', name: 'Apple Pay', desc: 'Digital wallet' }
        ],
        QA: [
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'Local banks' },
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'applepay', icon: '🍎', name: 'Apple Pay', desc: 'Digital wallet' }
        ],
        OM: [
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'Local banks' },
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'applepay', icon: '🍎', name: 'Apple Pay', desc: 'Digital wallet' }
        ],
        BH: [
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'Local banks' },
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'applepay', icon: '🍎', name: 'Apple Pay', desc: 'Digital wallet' }
        ],
        JP: [
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard, JCB' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'Local banks' },
            { method: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Digital wallet' },
            { method: 'applepay', icon: '🍎', name: 'Apple Pay', desc: 'Digital wallet' }
        ],
        KR: [
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'Local banks' },
            { method: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Digital wallet' },
            { method: 'applepay', icon: '🍎', name: 'Apple Pay', desc: 'Digital wallet' }
        ],
        CN: [
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'Alipay / WeChat / UnionPay' },
            { method: 'applepay', icon: '🍎', name: 'Apple Pay', desc: 'Digital wallet' }
        ],
        ID: [
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'GoPay / OVO / Local banks' },
            { method: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Digital wallet' }
        ],
        PH: [
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'GCash / PayMaya / Banks' },
            { method: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Digital wallet' }
        ],
        TH: [
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'PromptPay / Local banks' },
            { method: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Digital wallet' }
        ],
        VN: [
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'Momo / ZaloPay / Banks' },
            { method: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Digital wallet' }
        ],
        ZA: [
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'Local banks' },
            { method: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Digital wallet' },
            { method: 'applepay', icon: '🍎', name: 'Apple Pay', desc: 'Digital wallet' }
        ],
        NG: [
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'Local banks' },
            { method: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Digital wallet' }
        ],
        KE: [
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'M-Pesa / Local banks' },
            { method: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Digital wallet' }
        ],
        BR: [
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'Pix / Local banks' },
            { method: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Digital wallet' }
        ],
        MX: [
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'SPEI / OXXO' },
            { method: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Digital wallet' }
        ],
        RU: [
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard, Mir' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'SBP / Local banks' },
            { method: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Digital wallet' }
        ],
        TR: [
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'Local banks' },
            { method: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Digital wallet' }
        ],
        NL: [
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'iDEAL / SEPA' },
            { method: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Digital wallet' },
            { method: 'applepay', icon: '🍎', name: 'Apple Pay', desc: 'Digital wallet' }
        ],
        ES: [
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'SEPA' },
            { method: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Digital wallet' },
            { method: 'applepay', icon: '🍎', name: 'Apple Pay', desc: 'Digital wallet' }
        ],
        IT: [
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'SEPA' },
            { method: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Digital wallet' },
            { method: 'applepay', icon: '🍎', name: 'Apple Pay', desc: 'Digital wallet' }
        ],
        PL: [
            { method: 'card', icon: '💳', name: 'Card', desc: 'Visa, Mastercard' },
            { method: 'bank', icon: '🏦', name: 'Bank transfer', desc: 'BLIK / SEPA' },
            { method: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Digital wallet' },
            { method: 'applepay', icon: '🍎', name: 'Apple Pay', desc: 'Digital wallet' }
        ]
    };

    var countryNames = { BD: 'Bangladesh', IN: 'India', AE: 'UAE', US: 'United States', GB: 'United Kingdom', SA: 'Saudi Arabia', PK: 'Pakistan', OTHER: 'Your region' };
    function getAddMoneyConfig(region) {
        var r = (region || (typeof localStorage !== 'undefined' && localStorage.getItem('nokRegion')) || 'BD').toUpperCase();
        var base = C[r] || C.US;
        var payments = specialPayments[r] || defaultPayments;
        var min = base.localPerBdt >= 0.1 ? 0.5 : (base.localPerBdt >= 0.01 ? 5 : (base.localPerBdt >= 0.001 ? 50 : 100));
        if (r === 'BD') min = 50;
        if (r === 'IN') min = 50;
        if (r === 'PK') min = 100;
        return {
            currency: base.currency,
            code: base.code,
            localPerBdt: base.localPerBdt,
            min: min,
            name: countryNames[r] || ('Region ' + r),
            payments: payments
        };
    }

    /** Coin options: default 100/500/1000/5000. Manually add more – copy a line, change coins & priceUsd (1 coin = $0.05). */
    var COIN_PACKAGES = [
        { coins: 100,  priceUsd: 5   },
        { coins: 500,  priceUsd: 25  },
        { coins: 1000, priceUsd: 50  },
        { coins: 5000, priceUsd: 250 },
        // manually add: { coins: 5, priceUsd: 0.25 }, { coins: 10, priceUsd: 0.5 },
    ];
    function getCoinPackages() { return COIN_PACKAGES; }

    global.NOK_WALLET_COUNTRY = {
        getWalletConfig: getWalletConfig,
        getAddMoneyConfig: getAddMoneyConfig,
        getCoinPackages: getCoinPackages,
        all: C
    };
})(typeof window !== 'undefined' ? window : this);
