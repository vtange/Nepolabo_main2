var gltfManifest = {
    ring: {
        name: "ring",
        nodes: ["Torus.001"],
        path: ["assets/ring/","test_ring.glb"],
    },
    yukimin1: {
        name: "yukimin1",
        //MUST BE ARMATURE NAME OR YOU LOAD ANIMGROUPS WITH NO FROM/TO, NO TARGETANIMATIONS
        nodes: ["yukimin_armature"],
        path: ["assets/ring/","vtange_yukimin_NOERRORS_UNUSEDSKINPROB.glb"],
        //path: ["https://res.cloudinary.com/dmj8qtant/image/upload/v1613348422/importmesh_test/","model_quickVTXCLR_idlejog_singleaction_color.glb"],
        idleAnim: "idle_",
        faces: {
            close_eyes: "assets/ring/yuk_eyes_closed.png",
            happy: "assets/ring/yuk_happy.png",
            excited: "assets/ring/yuk_wakuwaku.png"
        },
        hoverWobble: 0.01,
        toonShadeCol: {
            bod: [15/255, 15/255, 16/255],
            hai: [15/255, 15/255, 16/255],
        },
        toonShadeShift: -0.23
    },
};
var SHOW_DEBUGGER = true;
var ringPolish = {
    furns: {
        ring: [[[0,0,0],0]],
    }
}