{
  programs.nixvim.plugins.lsp = {
    enable = true;
    servers = {
      ts_ls.enable = true;

      html.enable = true;
      cssls.enable = true;
      tailwindcss.enable = true;

      dockerls.enable = true;
      bashls.enable = true;

      lua-ls.enable = true;
      nil_ls.enable = true;
    };
  };
}
