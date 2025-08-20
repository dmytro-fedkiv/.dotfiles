{
  programs.nixvim = {
    plugins.telescope = {
      enable = true;

      extensions.fzf-native.enable = true;
    };

    keymaps = [
      {
        mode = "n";
        key = "<leader>ff";
        action = "<cmd>Telescope find_files<CR>";
      }
    ];
  };
}
