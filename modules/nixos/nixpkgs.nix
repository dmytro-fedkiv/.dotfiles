{
  nix.settings = {
    experimental-features = [
      "nix-command"
      "flakes"
    ];

    substituters = [ "https://cache.nixos.org/" ];
    trusted-public-keys = [
      "cache.nixos.org-1:6NCHdD59X431o0gWypbMrAURkbJ16ZPMQFGspcDShjY="
    ];

    extra-substituters = [ "https://vicinae.cachix.org" ];
    extra-trusted-public-keys = [ 
      "vicinae.cachix.org-1:1kDrfienkGHPYbkpNj1mWTr7Fm1+zcenzgTizIcI3oc=" 
    ];
  };
}
