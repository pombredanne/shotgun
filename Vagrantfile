Vagrant.configure(2) do |config|
  config.vm.provider "virtualbox" do |vb, vbcfg|
    vb.memory = 1024

    vbcfg.vm.box = "trusty64"

    if Vagrant.has_plugin?("vagrant-cachier")
      config.cache.scope = :box
    end

    vbcfg.vm.provision "docker"
  end

  config.vm.provider "docker" do |d|
    d.build_dir = "."
    d.ports << "3000:3000"
  end
end
