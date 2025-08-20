{ inputs, ... }:
{
  imports = [
    inputs.nixvim.nixosModules.nixvim
    ./plugins/cmp.nix
    ./plugins/conform-nvim.nix
    ./plugins/lint.nix
    ./plugins/lsp.nix
    ./plugins/lualine.nix
    ./plugins/neo-tree.nix
    ./plugins/telescope.nix
    ./plugins/treesitter.nix
  ];

  programs.nixvim = {
    enable = true;

    globals.mapleader = " ";

    keymaps = [
      {
        mode = "n";
        key = "<C-h>";
        action = "<cmd>wincmd h<CR>";
      }
      {
        mode = "n";
        key = "<C-j>";
        action = "<cmd>wincmd j<CR>";
      }
      {
        mode = "n";
        key = "<C-k>";
        action = "<cmd>wincmd k<CR>";
      }
      {
        mode = "n";
        key = "<C-l>";
        action = "<cmd>wincmd l<CR>";
      }
    ];

    opts = {
      tabstop = 2;
      shiftwidth = 2;
      expandtab = true;
      number = true;
      relativenumber = true;
      termguicolors = true;
      mouse = "a";
    };
  };
}
