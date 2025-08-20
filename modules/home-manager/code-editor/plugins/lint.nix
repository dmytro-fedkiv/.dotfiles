{
  programs.nixvim = {
    plugins.lint = {
      enable = true;

      lintersByFt = {
        javascript = [ "eslint_d" ];
        typescript = [ "eslint_d" ];
        javascriptreact = [ "eslint_d" ];
        typescriptreact = [ "eslint_d" ];

        json = [ "jsonlint" ];
        css = [ "eslint_d" ];

        lua = [ "luacheck" ];
        nix = [ "nix" ];
      };
    };

    extraConfigLua = ''
      local lint = require('lint')

      vim.api.nvim_create_autocmd({ "BufWritePost" }, {
        group = vim.api.nvim_create_augroup("nvim-lint", { clear = true }),
        callback = function() lint.try_lint() end,
      })
    '';

    keymaps = [
      {
        mode = "n";
        key = "<leader>e";
        action = "<cmd>lua vim.diagnostic.open_float()<CR>";
      }
    ];
  };
}
