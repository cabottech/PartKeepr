Ext.define("PartKeepr.Components.RadishiDialog", {
    extend: "Ext.window.Window",

    title: i18n("Radishi"),
    width: 400,
    height: 400,

    items: [{
        xtype: 'component',
        html: i18n("<h1>Radishi</h1>") +
        i18n("<p>Process tracking is just one click away! :)</p>") +
        i18n('<a href="https://radishi.com" target="_blank" class="radishiButton"></a>')

    }]

});