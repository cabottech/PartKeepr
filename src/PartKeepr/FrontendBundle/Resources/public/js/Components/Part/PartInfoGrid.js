Ext.define("PartKeepr.Components.Part.PartInfoGrid", {
    extend: "Ext.grid.property.Grid",

    sortableColumns: false,

    fieldConfigs: {
        internalPartNumber: {
            displayName: i18n("IPN")
        },
        "category.name": {
            displayName: i18n("Category Name")
        },
        stockLevel: {
            displayName: i18n("Stock Level")
        },
        minStockLevel: {
            displayName: i18n("Minimum Stock Level")
        },
        "footprint.name": {
            displayName: i18n("Footprint")
        },
        "storageLocation.name": {
            displayName: i18n("Storage Location")
        },
        comment: {
            displayName: i18n("Comment")
        },
        createDate: {
            displayName: i18n("Create Date"),
            type: 'date'
        },
        status: {
            displayName: i18n("Status")
        },
        partCondition: {
            displayName: i18n("Condition")
        },
        needsReview: {
            displayName: i18n("Needs Review"),
            type: 'boolean'
        },
        projectNames: {
            displayName: i18n("Used in Projects")
        },
        "@id": {
            displayName: i18n("Internal ID"),
            renderer: function (value)
            {
                var values = value.split("/");
                var idstr = values[values.length - 1];
                var idint = parseInt(idstr);
                return idstr + " (#" + idint.toString(36) + ")";
            }
        }
    },

    shortFieldConfigs: {
        "name": {
            displayName: i18n("Name")
        },
        "description": {
            displayName: i18n("Description")
        },
        "category.name": {
            displayName: i18n("Category Name")
        },
        stockLevel: {
            displayName: i18n("Stock Level")
        },
        "footprint.name": {
            displayName: i18n("Footprint")
        },
        "storageLocation.name": {
            displayName: i18n("Storage Location")
        },
        comment: {
            displayName: i18n("Comment")
        },
        internalPartNumber: {
            displayName: i18n("IPN")
        }
    },

    listeners: {
        'beforeedit': function ()
        {
            return false;
        }
    },
    hideHeaders: true,
    nameColumnWidth: 150,
    cls: 'x-wrappable-grid',

    mode: 'full',

    initComponent: function ()
    {
        if (this.mode === "full") {
            this.sourceConfig = this.fieldConfigs;
        } else {
            this.sourceConfig = this.shortFieldConfigs;
        }

        this.callParent(arguments);
    },
    applyFromPart: function (record)
    {
        var values = {}, value;

        for (var i in this.sourceConfig) {
            value = record.get(i);
            if (value !== undefined) {
                values[i] = value;
            } else {
                values[i] = i18n("none");
            }
        }

        this.setSource(values);
    }

});
