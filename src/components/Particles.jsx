import React, { useCallback } from 'react';
import { Particles as TsParticles } from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import './Particles.css';

const Particles = ({ variant = 'default' }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const getConfig = () => {
    const configs = {
      default: {
        particles: {
          number: {
            value: 15,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: ['#3a86ff', '#5e60ce', '#4cc9f0']
          },
          shape: {
            type: ['circle', 'triangle', 'polygon'],
            polygon: { nb_sides: 6 }
          },
          opacity: {
            value: 0.6,
            random: true,
            anim: {
              enable: true,
              speed: 0.2,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 5,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: false
          },
          move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'bubble'
            },
            onclick: {
              enable: true,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            bubble: {
              distance: 150,
              size: 8,
              duration: 2,
              opacity: 0.8,
              speed: 3
            },
            push: {
              particles_nb: 3
            }
          }
        },
        retina_detect: true,
        background: {
          color: 'transparent',
          image: '',
          position: '50% 50%',
          repeat: 'no-repeat',
          size: 'cover'
        }
      },
      courses: {
        particles: {
          number: {
            value: 20,
            density: {
              enable: true,
              value_area: 900
            }
          },
          color: {
            value: ['#3a86ff', '#5e60ce', '#4cc9f0', '#7209b7']
          },
          shape: {
            type: ['circle', 'edge'],
            polygon: { nb_sides: 5 }
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: {
              enable: true,
              speed: 0.2,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 4,
            random: true,
            anim: {
              enable: true,
              speed: 1.5,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#3a86ff',
            opacity: 0.2,
            width: 1
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'grab'
            },
            onclick: {
              enable: true,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 0.5
              }
            },
            push: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true,
        background: {
          color: 'transparent',
          image: '',
          position: '50% 50%',
          repeat: 'no-repeat',
          size: 'cover'
        }
      },
      courseDetail: {
        particles: {
          number: {
            value: 12,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: ['#3a86ff', '#5e60ce', '#4cc9f0']
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 0.4,
            random: true,
            anim: {
              enable: true,
              speed: 0.2,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 6,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: false
          },
          move: {
            enable: true,
            speed: 0.6,
            direction: 'top',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'bubble'
            },
            onclick: {
              enable: false
            },
            resize: true
          },
          modes: {
            bubble: {
              distance: 150,
              size: 8,
              duration: 2,
              opacity: 0.6,
              speed: 3
            }
          }
        },
        retina_detect: true,
        background: {
          color: 'transparent',
          image: '',
          position: '50% 50%',
          repeat: 'no-repeat',
          size: 'cover'
        }
      }
    };
    
    return configs[variant] || configs.default;
  };

  return (
    <div className="particles-background">
      <TsParticles
        id={`tsparticles-${variant}`}
        init={particlesInit}
        options={getConfig()}
      />
    </div>
  );
};

export default Particles;