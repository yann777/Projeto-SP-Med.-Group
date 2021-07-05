using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace senai.spmedicalgroup.webApi
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers()


            .AddNewtonsoftJson(options =>
            {
                // Ignora os loopings nas consultas
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                // Ignora valores nulos ao fazer jun��es nas consultas
                options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
            });
            services.AddCors(options => {
                options.AddPolicy("CorsPolicy",
                builder => {
                    builder.WithOrigins("http://localhost:3000", "http://localhost:19006")
                    .AllowAnyHeader()
                    .AllowAnyMethod();

                }
                );
            });
            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "SpMed.webApi",
                    Version = "v1",
                    Description = "Essa API foi feita com objetivo de aprimorar meus " +
                    "conhecimentos no desenvolvimento das mesmas, utilizando Entity Framework, DbFirst  ",
                    Contact = new OpenApiContact
                    {
                        Name = "Caic Mateus",
                        Email = string.Empty,

                    }
                });
                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            }
                );

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = "JwtBearer";
                options.DefaultChallengeScheme = "JwtBearer";
            })

                .AddJwtBearer("JwtBearer", options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("spmed-chave-autenticacao")),
                        ClockSkew = TimeSpan.FromMinutes(5),
                        ValidIssuer = "SpMed.webApi",
                        ValidAudience = "SpMed.webApi"
                    };
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseRouting();
            app.UseCors("CorsPolicy");

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "SpMed.webApi");
                c.RoutePrefix = string.Empty;
            });

            app.UseAuthentication();

            app.UseAuthorization();

            

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
