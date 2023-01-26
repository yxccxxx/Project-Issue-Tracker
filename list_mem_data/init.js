var dataObj = {

  "totalNum": 4,
  
  "issues": [

    {
      "id": 1,
      "status": "open",
      "name": "Old Tags",
      "type": "applet and marquee tags",
      "description": "applet and marquee tags are obsoleted.",
      
      "content": [
        "applet",
        "The applet tag is an obsoleted tag. It will not work in current browsers. Also, it will lead to some errors during the validation check. Need to check this issue or use other method to substitute.",
        "Since the applet tag is obsoleted and not supported anymore, the actual implementation is not applied in this page. Below is an example of applet usage.",
        "&lt;applet code=\"TestApplet.class\" align=\"left\" archive=\"TestApplet.zip\" width=\"320\" height=\"120\" alt=\"an applet example\"&gt;<br>A string \"Test Applet\" should show up.<br>&lt;/applet&gt;",
        "marquee",
        "marquee is also an obsoleted tag. Unlike the applet example above, the marquee element still works in current browsers. But it will still lead to some errors and warnings during the validation check. Need to check this issue or use other method to substitute.",
        "Since the marquee tag will lead to errors during validation check, the actual implementation is not applied. "
      ],

      "attachments": [
        {
          "url": "../img/marquee_error.jpg",
          "description": "marquee tag error messages"
        },
        {
          "url": "../img/applet_error.png",
          "description": "applet tag error messages"
        }
      ]
    },

    {
      "id": 2,
      "status": "open",
      "file": "branch_1_data/issue1.json"
    },

    {
      "id": 3,
      "status": "open",
      "file": "branch_1_data/issue1.json"
    },

    {
      "id": 4,
      "status": "open",
      "file": "branch_1_data/issue1.json"
    }
  ]


  
}