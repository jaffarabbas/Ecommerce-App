using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace EcommerseAppDtos.Dtos;

[Table("CATEGORIES")]
public partial class Category
{
    [Key]
    [Column("cid")]
    public int Cid { get; set; }

    [Column("cname")]
    [StringLength(255)]
    [Unicode(false)]
    public string Cname { get; set; } = null!;

    [Required]
    [Column("c_status")]
    public bool? CStatus { get; set; }

    [InverseProperty("CidNavigation")]
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
