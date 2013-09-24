Vagrant.configure("2") do |config|
  config.vm.box = "precise64"
  config.vm.box_url = "http://files.vagrantup.com/precise64.box"
  config.vm.hostname = "phantomjs"

  config.vm.network :private_network, ip: "10.10.0.119"
  config.vm.network "forwarded_port", guest: 3000, host: 3000

  config.vm.provision :ansible do |ansible|
    ansible.playbook = "../ansible-playbooks/phantomjs.yml"
    ansible.inventory_path = "provisioning/hosts"
    ansible.verbose = true
  end

  config.vm.provision :ansible do |ansible|
    ansible.playbook = "../ansible-playbooks/node_app.yml"
    ansible.inventory_path = "provisioning/hosts"
    ansible.extra_vars = { 
      env: "development"
    }
    ansible.verbose = true
  end
end