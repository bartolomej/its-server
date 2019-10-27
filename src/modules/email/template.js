module.exports = ({ text, email, officeAddress, unsubscribeUrl, legalName }) => `
<table cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width :600px; padding: 10px 0">
    <tbody>
    <tr style="border-bottom:solid 1px #ccc">
        <td align="center" style="padding: 30px">
            <a href="./">
                <img src="https://its.racunalnisko-drustvo.si/static/img/brand/rd-logo.png" height="70" alt="ITS logo"/>
            </a>
        </td>
    </tr>
    <tr>
        <td>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                <tbody>
                <tr>
                    <td style="padding: 40px 20px;font-family: sans-serif;font-size: 15px;line-height: 20px;color: #555555;!important;border-top: 1px solid #dbe1e8;!important;border-bottom: 1px solid #dbe1e8;!important;">
                        ${text}
                    </td>
                </tr>
                </tbody>
            </table>
        </td>
    </tr>
    <tr>
        <td>
            <div style="padding: 40px 20px;text-align: center;color: #b2b2b2;font-size: 12px;font-weight: 300;line-height: 18px;">
                ${legalName}
                <br>
                <a href="mailto:${email}" style="margin:0;color: #b2b2b2;font-family: Graphik,Helvetica,Arial,sans-serif;font-weight: 300;line-height: 130%;padding: 0;text-align: left;text-decoration: underline">${email}</a>
                <br>
                ${officeAddress}
                <br>
                <a href="${unsubscribeUrl}" target="_blank" style="margin:0;color: #b2b2b2;font-family: Graphik,Helvetica,Arial,sans-serif;font-weight: 300;line-height: 130%;padding: 0;text-align: left;text-decoration: underline">Preklici novice</a>
            </div>
        </td>
    </tr>
    </tbody>
</table>
`;