Ext.define('PartKeepr.ServerLoadDisplay', {
    extend: 'Ext.Toolbar.TextItem',

    /**
     * Holds the server load update task
     * @var object
     */
    updateServerLoadTask: null,

    /**
     * Holds the layout task
     * @var object
     */
    updateLayoutTask: null,

    /**
     * Inits the component. Sets up two timers for updating the server load and updating the widget's layout.
     *
     * @param none
     * @return nothing
     */
    initComponent: function () {
        this.systemInfoStore = Ext.create("Ext.data.Store",
            {
                model: 'PartKeepr.SystemInformationRecord',
                sorters: ['category', 'name'],
                groupField: 'category'
            });

        //this.callParent();

        this.updateServerLoadTask = {
            run: this.updateServerLoad,
            interval: 3000, // Update every ~3 seconds (there are overheads).
            scope: this
        };
    },
    /**
     * Start both updating tasks just before rendering starts.
     * @param none
     * @return nothing
     */
    beforeRender: function () {
        this.callParent();
        Ext.TaskManager.start(this.updateServerLoadTask);
    },
    /**
     * Updates the server load.
     *
     * @param none
     * @return nothing
     */
    updateServerLoad: function () {
        var loginManager = PartKeepr.getApplication().getLoginManager();
        if (!loginManager.isLoggedIn()) {
            this.el.update('Load: ___ ___ ___');
            return;
        }

        /*
        this.systemInfoStore = Ext.create("Ext.data.Store",
        {
            model: 'PartKeepr.SystemInformationRecord',
            sorters: ['category', 'name'],
            groupField: 'category'
        });
        */

        // this.callParent();

        // Retrieve the system information
        this.systemInfoStore.load();

        // var sys_proxy = this.systemInfoStore.getProxy();
        // var sys_data = this.systemInfoStore.getData();

        var rec = this.systemInfoStore.findRecord("name", "Load Average (1, 5, 15 minutes)");

        if (!rec) {
            this.el.update('Load: ___ ___ __?');
            return;
        }

        var load = rec.get("value");

        if (load == null) {
            this.el.update('Load: ___ __? __?');
            return;
        }

        this.el.update('Load: ' + load);
    },
    /**
     * When the widget is removed, destroy both tasks.
     *
     * @param none
     * @return nothing
     */
    onDestroy: function () {
        Ext.TaskManager.stop(this.updateServerLoadTask);
    }
});
