{
  programs.nixvim = {
    plugins.neo-tree = {
      enable = true;
      enableGitStatus = true;
      enableRefreshOnWrite = true;
      closeIfLastWindow = true;
      buffers = {
        bindToCwd = false;
        followCurrentFile = {
          enabled = true;
        };
      };
      window = {
        width = 40;
        height = 15;
        autoExpandWidth = false;
        mappings = {
          "<space>" = "none";
        };
      };
    };

    keymaps = [
      {
        mode = "n";
        action = ":Neotree filesystem reveal left<CR>";
        key = "<C-n>";
      }
    ];
  };
}
